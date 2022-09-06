/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import options2Fill from '@iconify/icons-eva/options-2-fill';
// material
import {
  Box,
  Paper,
  Tooltip,
  Divider,
  Typography,
  Stack,
  TextField,
  Autocomplete,
  IconButton,
  Grid,
  Button
} from '@material-ui/core';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
//
import Scrollbar from '../Scrollbar';
import { MIconButton } from '../@material-extend';
import SettingMode from './SettingMode';
import SettingColor from './SettingColor';
import SettingStretch from './SettingStretch';
import SettingDirection from './SettingDirection';
import SettingFullscreen from './SettingFullscreen';
import './style.scss';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 260;

const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'subtitle1', 'body1', 'body2', 'inherit'];

export default function Settings({ edit, setEdit, editContent, setContent, contentPrev, setContentPrev }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  useEffect(() => {
    if (edit !== '') {
      setOpen(true);
    }
  }, [edit]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setEdit('');
    setOpen(false);
  };

  return (
    <>
      {/* <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose} /> */}

      <Box
        sx={{
          // top: 12,
          // bottom: 12,
          // right: 0,
          // position: 'fixed',
          zIndex: 2001,
          // ...(open && { right: 12 })
          maxWidth: DRAWER_WIDTH
        }}
      >
        <Box
          sx={{
            p: 0.5,
            px: '4px',
            mt: -3,
            // left: -44,
            zIndex: -1,
            top: '50%',
            color: 'grey.800',
            position: 'absolute',
            right: 0,
            bgcolor: 'common.white',
            borderRadius: '24px 0 16px 24px',
            boxShadow: (theme) => theme.customShadows.z12
          }}
        >
          <Tooltip title="Settings">
            <MIconButton
              color="inherit"
              onClick={handleToggle}
              sx={{
                p: 0,
                width: 40,
                height: 40,
                transition: (theme) => theme.transitions.create('all'),
                '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
              }}
            >
              <Icon icon={open ? closeFill : options2Fill} width={20} height={20} />
            </MIconButton>
          </Tooltip>
        </Box>

        <Paper
          sx={{
            height: 1,
            width: '0px',
            overflow: 'hidden',
            boxShadow: (theme) => theme.customShadows.z24,
            transition: (theme) => theme.transitions.create('width'),
            ...(open && { width: DRAWER_WIDTH })
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2, pr: 1, pl: 2.5 }}>
            <Typography variant="subtitle1">Settings</Typography>
            <MIconButton onClick={handleClose}>
              <Icon icon={closeFill} width={20} height={20} />
            </MIconButton>
          </Stack>
          <Divider />

          {edit === '' && open && (
            <Scrollbar sx={{ height: 1 }}>
              <Stack spacing={4} sx={{ pt: 3, px: 3, pb: 15 }}>
                {/* <Stack spacing={1.5}>
                <Typography variant="subtitle2">Mode</Typography>
                <SettingMode />
              </Stack> */}

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Direction</Typography>
                  <SettingDirection />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Color</Typography>
                  <SettingColor />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Stretch</Typography>
                  <SettingStretch />
                </Stack>

                <SettingFullscreen />
              </Stack>
            </Scrollbar>
          )}
          {edit !== '' && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={4} sx={{ pt: 3, px: 3, pb: 15 }}>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Content</Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      value={editContent.content}
                      onChange={(e) =>
                        setContent({
                          content: e.target.value,
                          setting: editContent.setting
                        })
                      }
                    />
                  </Stack>

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Variant</Typography>
                    <Autocomplete
                      disablePortal
                      id="disable-clearable"
                      disableClearable
                      fullWidth
                      options={variants}
                      getOptionLabel={(option) => option}
                      onChange={(event, newValue) =>
                        setContent({
                          content: editContent.content,
                          setting: {
                            variant: newValue,
                            color: editContent.setting.color,
                            fontStyle: editContent.setting.fontStyle,
                            fontWeight: editContent.setting.fontWeight,
                            decoration: editContent.setting.decoration
                          }
                        })
                      }
                      value={editContent.setting.variant}
                      renderInput={(params) => <TextField {...params} margin="none" />}
                    />
                  </Stack>

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Front style</Typography>
                    <Stack direction="row" spacing={2}>
                      <IconButton
                        color={editContent.setting.fontStyle === 'normal' ? 'inherit' : 'primary'}
                        onClick={(e) => {
                          setContent({
                            content: editContent.content,
                            setting: {
                              variant: editContent.setting.variant,
                              color: editContent.setting.color,
                              fontStyle: editContent.setting.fontStyle === 'normal' ? 'italic' : 'normal',
                              fontWeight: editContent.setting.fontWeight,
                              decoration: editContent.setting.decoration
                            }
                          });
                        }}
                      >
                        <FormatItalicIcon />
                      </IconButton>
                      <IconButton
                        color={editContent.setting.fontWeight === 'normal' ? 'inherit' : 'primary'}
                        onClick={(e) => {
                          setContent({
                            content: editContent.content,
                            setting: {
                              variant: editContent.setting.variant,
                              color: editContent.setting.color,
                              fontStyle: editContent.setting.fontStyle,
                              fontWeight: editContent.setting.fontWeight === 'normal' ? 'bold' : 'normal',
                              decoration: editContent.setting.decoration
                            }
                          });
                        }}
                      >
                        <FormatBoldIcon />
                      </IconButton>
                      <IconButton
                        color={editContent.setting.decoration === 'none' ? 'inherit' : 'primary'}
                        onClick={(e) => {
                          setContent({
                            content: editContent.content,
                            setting: {
                              variant: editContent.setting.variant,
                              color: editContent.setting.color,
                              fontStyle: editContent.setting.fontStyle,
                              fontWeight: editContent.setting.fontWeight,
                              decoration: editContent.setting.decoration === 'none' ? 'underline' : 'none'
                            }
                          });
                        }}
                      >
                        <FormatUnderlinedIcon />
                      </IconButton>
                    </Stack>
                  </Stack>

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Color</Typography>
                    <label className="color-selector">
                      <span className="circle" style={{ background: editContent.setting.color }} />
                      <span>{editContent.setting.color}</span>
                      <input
                        type="color"
                        value={editContent.setting.color}
                        onChange={(e) =>
                          setContent({
                            content: editContent.content,
                            setting: {
                              variant: editContent.setting.variant,
                              color: e.target.value,
                              fontStyle: editContent.setting.fontStyle,
                              fontWeight: editContent.setting.fontWeight,
                              decoration: editContent.setting.decoration
                            }
                          })
                        }
                        className="hidden"
                      />
                    </label>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6} sx={{ textAlign: 'center' }}>
                    <Button
                      size="small"
                      color="primary"
                      type="submit"
                      variant="contained"
                      onClick={() => {
                        setContentPrev(editContent);
                        setEdit('');
                      }}
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'center' }}>
                    <Button
                      size="small"
                      color="secondary"
                      type="submit"
                      variant="contained"
                      onClick={() => {
                        setContent(contentPrev);
                        setEdit('');
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Box>
    </>
  );
}
