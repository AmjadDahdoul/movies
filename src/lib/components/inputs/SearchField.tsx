import { IconButton, InputAdornment, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useSearchParams } from "react-router";
import { useCallback, useState } from "react";

export const SearchField = (
  props: Omit<React.ComponentProps<typeof TextField>, "onChange">
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState(
    searchParams.get("search") || ""
  );

  const debouncedSetSearch = useCallback(
    (value: string) => {
      const timeout = setTimeout(() => {
        setSearchParams({ search: value }, { replace: true });
      }, 300);

      return () => clearTimeout(timeout);
    },
    [setSearchParams]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedSetSearch(value.trim());
  };

  const handleClear = () => {
    setLocalSearch("");
    setSearchParams({ search: "" }, { replace: true });
  };

  return (
    <TextField
      label='Search'
      variant='standard'
      color='primary'
      value={localSearch}
      onChange={handleSearchChange}
      {...props}
      slotProps={{
        input: {
          endAdornment: localSearch ? (
            <InputAdornment position='end'>
              <IconButton
                aria-label='clear search'
                onClick={handleClear}
                edge='end'
                size='small'
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
    />
  );
};
