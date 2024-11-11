import { useState, useEffect } from 'react';
import { DashboardContent } from 'src/layouts/dashboard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, Button, IconButton, MenuItem, TextField } from '@mui/material';
import { Editor } from 'src/components/editor/editor';
import type { LyricCategory, LyricPost } from 'src/types';
import { PostLyric, FetchLyricCategories } from 'src/services/apiService';

export function NovaPesemView() {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [chorusContent, setChorusContent] = useState('');
  const [kiticas, setKiticas] = useState<string[]>([]);
  const [categories, setCategories] = useState<LyricCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // New state for selected categories

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await FetchLyricCategories();
        setCategories(result);
      } catch (err) {
        console.error('Failed to load categories:', err);
        alert('Napaka pri nalaganju kategorij.');
      }
    };
    loadCategories();
  }, []);

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
      await PostLyric(lyricPost);
      alert('Pesem je bila shranjena!');
      // redirect to the lyrics page
      window.location.href = '/pesmi';
    } catch (error) {
      console.error('Napaka pri shranjevanju pesmi:', error);
      alert('Napaka pri shranjevanju pesmi.');
    }
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Nova pesem
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
          <Editor onUpdate={({ editor }) => setChorusContent(editor.getHTML())} />
        </Box>

        {/* Render all kitica editors */}
        {kiticas.map((kitica, index) => (
          <Box key={index} p={3} display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography variant="h6">Vnesi kitico {index + 1}</Typography>
              <Editor onUpdate={({ editor }) => updateKiticaContent(index, editor.getHTML())} />
            </Box>
            <IconButton onClick={() => removeKitica(index)} aria-label="remove kitica">
              -
            </IconButton>
          </Box>
        ))}

        {/* Buttons to add new kitica and save the song */}
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
