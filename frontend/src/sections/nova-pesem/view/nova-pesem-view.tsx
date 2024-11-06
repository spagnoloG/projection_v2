import { useState } from 'react';
import { DashboardContent } from 'src/layouts/dashboard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, Button, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Editor } from 'src/components/editor/editor';
import type { LyricPost } from 'src/types';
import { PostLyric } from 'src/services/apiService';

export function NovaPesemView() {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false); // Error state for title
  const [chorusContent, setChorusContent] = useState('');
  const [kiticas, setKiticas] = useState<string[]>([]);

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

    const lyricPost: LyricPost = {
      title,
      categories: [], // Add categories if needed
      content: {
        refren: chorusContent,
        kitice: kiticas,
      },
    };

    try {
      await PostLyric(lyricPost);
      alert('Pesem je bila shranjena!');
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
          <Button variant="contained" color="primary" onClick={handleSave}>
            Shrani pesem
          </Button>
        </Box>
      </Card>
    </DashboardContent>
  );
}
