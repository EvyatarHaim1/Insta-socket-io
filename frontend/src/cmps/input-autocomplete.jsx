import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { gUsers } from '../assets/services.js/user-service'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function AutocompleteInput() {
  const navigate = useNavigate()

  function goToOtherProfile(u) {
    navigate(`/instagram/${u.username}`, { state: { otherUser: u } })
  }

  return (
    <Autocomplete
      id='user-select'
      sx={{
        width: 330,
        boxShadow: 'none',
        '.Mui-focused': { border: 'none' },
        '.MuiOutlinedInput-notchedOutline': { border: 'none' },
      }}
      options={gUsers}
      //   autoHighlight
      getOptionLabel={(option) => option.fullname}
      renderOption={(props, option) => (
        <Box
          component='li'
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <div
            style={{ display: 'flex' }}
            onClick={() => goToOtherProfile(option)}
          >
            <Avatar
              src={option.imgUrl}
              alt='user'
              sx={{ marginRight: '16px' }}
            />
            {option.fullname}
          </div>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ border: 'none' }}
          placeholder='Search'
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  )
}
