import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardContent } from 'src/layouts/dashboard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, Button, IconButton, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Editor } from 'src/components/editor/editor';
import type { LyricPost, Lyric, LyricCategory } from 'src/types';
import { FetchLyricById, PatchLyric, FetchLyricCategories } from 'src/services/apiService';

export function UrediPesemView() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [chorusContent, setChorusContent] = useState('');
  const [kiticas, setKiticas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<LyricCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // New state for selected categories

  useEffect(() => {
    const loadLyric = async () => {
      if (!id) return;
      try {
        const lyric = await FetchLyricById(id);
        setTitle(lyric.title);
        setChorusContent(lyric.content.refren);
        setKiticas(lyric.content.kitice);

        const fetchedCategories = await FetchLyricCategories();
        setCategories(fetchedCategories);

        const categoryIds = lyric.categories
          .map((lyricCategoryName) => {
            const matchedCategory = fetchedCategories.find(
              (category) => category.category === lyricCategoryName
            );
            return matchedCategory ? String(matchedCategory._id) : null;
          })
          .filter((categoryId) => categoryId !== null);

        setSelectedCategories(categoryIds);
      } catch (error) {
        console.error('Failed to load lyric:', error);
        alert('Napaka pri nalaganju pesmi.');
      } finally {
        setLoading(false);
      }
    };
    loadLyric();
  }, [id]);

  const addKitica = () => setKiticas([...kiticas, '']);

  const updateKiticaContent = (index: number, content: string) => {
    setKiticas((prevKiticas) => prevKiticas.map((kitica, i) => (i === index ? content : kitica)));
  };

  const removeKitica = (index: number) => {
    setKiticas((prevKiticas) => prevKiticas.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    setTitleError(false);

    if (!id) {
      console.error('ID is undefined, cannot update.');
      return;
    }

    const category_names = selectedCategories
      .map((categoryId) => {
        const selectedCategory = categories.find((c) => c._id === parseInt(categoryId, 10)); // Provide radix 10
        return selectedCategory ? selectedCategory.category : null;
      })
      .filter((category): category is string => category !== null);

    const lyricPost: LyricPost = {
      title,
      categories: category_names,
      content: {
        refren: chorusContent,
        kitice: kiticas,
      },
    };

    try {
      await PatchLyric(id, lyricPost);
      alert('Pesem je bila posodobljena!');
      // redirect to the lyrics page
      window.location.href = '/pesmi';
    } catch (error) {
      console.error('Napaka pri posodabljanju pesmi:', error);
      alert('Napaka pri posodabljanju pesmi.');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Urejanje pesmi
        </Typography>
      </Box>
      <Card>
        <Box p={3}>
          <Typography variant="h6">Vnesi naslov pesmi</Typography>
          <TextField
            fullWidth
            required
            label="Naslov pesmi"
            variant="standard"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
            error={titleError}
            helperText={titleError ? 'Naslov pesmi ne sme biti prazen.' : ''}
          />
        </Box>
        {/* Category Selection */}
        <Box p={3}>
          <Typography variant="h6">Izberi kategorijo</Typography>
          <TextField
            fullWidth
            select
            required
            SelectProps={{
              multiple: true,
            }}
            variant="standard"
            label="Kategorije"
            value={selectedCategories}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedCategories(Array.isArray(value) ? (value as string[]) : []);
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.category}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box p={3}>
          <Typography variant="h6">Vnesi refren</Typography>
          <Editor
            onUpdate={({ editor }) => setChorusContent(editor.getHTML())}
            content={chorusContent}
          />
        </Box>

        {kiticas.map((kitica, index) => (
          <Box key={index} p={3} display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography variant="h6">Vnesi kitico {index + 1}</Typography>
              <Editor
                onUpdate={({ editor }) => updateKiticaContent(index, editor.getHTML())}
                content={kitica}
              />
            </Box>
            <IconButton onClick={() => removeKitica(index)} aria-label="remove kitica">
              -
            </IconButton>
          </Box>
        ))}

        <Box p={3} display="flex" justifyContent="space-between">
          <Button variant="contained" onClick={addKitica}>
            + Dodaj novo kitico
          </Button>
          <Button variant="contained" color="inherit" onClick={handleSave}>
            Shrani pesem
          </Button>
        </Box>
      </Card>
    </DashboardContent>
  );
}
