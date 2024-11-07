import { useState } from 'react';
import { DashboardContent } from 'src/layouts/dashboard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, Button, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Editor } from 'src/components/editor/editor';
import type { LyricCategoryPost } from 'src/types';
import { CreateLyricCategory } from 'src/services/apiService';

export function NovaKategorijaView() {
  const [titleError, setTitleError] = useState(false); // Error state for title
  const [category, setCategory] = useState<string>('');

  const handleSave = async () => {
    if (!category.trim()) {
      setTitleError(true);
      return;
    }
    setTitleError(false);

    const lyricCategoryPost: LyricCategoryPost = {
      category,
    };

    try {
      alert('Kategorija je bila shranjena!');
      await CreateLyricCategory(lyricCategoryPost);
    } catch (error) {
      console.error('Napaka pri shranjevanju kategorije:', error);
      alert('Napaka pri shranjevanju kategorije.');
    }
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Nova Kategorija
        </Typography>
      </Box>
      <Card>
        <Box p={3}>
          <Typography variant="h6">Vnesi ime kategorije</Typography>
          <TextField
            fullWidth
            required
            label="Ime kategorije"
            variant="standard"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setTitleError(false);
            }}
            error={titleError}
            helperText={titleError ? 'Kategorija ne sme biti prazna.' : ''}
          />
        </Box>
        <Box p={3} display="flex" justifyContent="space-between">
          <Button variant="contained" color="inherit" onClick={handleSave}>
            Shrani kategorijo
          </Button>
        </Box>
      </Card>
    </DashboardContent>
  );
}
