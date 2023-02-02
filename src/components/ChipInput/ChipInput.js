import React, { memo } from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';

// Component for Chips UI in the tag searching bar
const ChipInput = ({setTags}) => {
  return (
    <Autocomplete
      sx={{margin: '10px 0',}}
      multiple
      options={[]}
      defaultValue={[]}
      freeSolo
      onChange={(event, value) => setTags(value)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          return (
            <Chip
              key={index}
              label={option}
              {...getTagProps({ index })}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Search Tags"
          placeholder="Press Enter to add a tag."
        />
      )}
    />
  )
}

export default memo(ChipInput)
