import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Iconify } from 'src/components/iconify';
import { DeleteLyricCategory } from 'src/services/apiService';
import type { LyricCategory } from 'src/types';

// ----------------------------------------------------------------------

type LyricTableRowProps = {
  row: LyricCategory;
  selected: boolean;
  onSelectRow: () => void;
  onDelete?: (id: string) => void; // Make onDelete optional
};

export function UserTableRow({ row, selected, onSelectRow, onDelete }: LyricTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this lyric?');
    if (!confirmed) return;

    try {
      await DeleteLyricCategory(row.category);
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('Failed to delete the category.');
    } finally {
      handleClosePopover();
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.category} src="/" />
            {row.category}
          </Box>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Izbriši
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
