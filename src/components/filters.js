import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

// routes config
import routes from '../routes'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




export  function run_filters(models, filters){
    const filtered =  models.filter( model => {
        for (const name in filters){
            const filter = filters[name];
            switch (filter.type){
                case "MultipleSelectFilter":
                    if (!filter.values.includes(model[name])){
                        return false
                    }
                    break;
                case "SearchFilter":
                    const text = filter.text;
                    const fields = filter.fields;
                    console.log(fields, text)
                    if (fields.every( field => !model[field].includes(text))){
                        return false
                    }
                    break;
            }
        }
        return true
    })
    console.log("filtered", filtered)
    return filtered;
}



export function MultipleSelectFilter({name, label, choices, filters, setFilters}) {
    const [checked, setChecked] = React.useState(choices);

     React.useEffect(() => {
        setChecked(choices);
        const filters_ = {
            ...filters,
            [name] : {
                type: "MultipleSelectFilter",
                values: choices
            }
        }
        setFilters(filters_)
        console.log("MultipleSelectFilter filters", filters_)
        console.log("choices", choices)
        console.log("checked", checked)
     }, [choices]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        const checked_ = typeof value === 'string' ? value.split(',') : value;
        setChecked(checked_);
        const filters_ = {
            ...filters,
            [name] : {
                type: "MultipleSelectFilter",
                values: checked_
            }
        }
        setFilters(filters_)
        console.log("MultipleSelectFilter filters", filters_)
    };

    return (
        <div>
            <FormControl
                margin={"4"}
              style={{ width: 300, marginBottom: 20, marginTop: 10 }}
            >
                <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
                <Select
                    style={{ width: "100%" }}
                    value={checked}
                    onChange={handleChange}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    renderValue={(checked) => {
                        const nb = checked.length;
                        //checked.join(', ')}
                        return ( nb == 1 ? `${checked}` : `${nb} selected`)
                    }}
                >
                    {choices.map((choice) => (
                        <MenuItem key={choice} value={choice}>
                            <Checkbox checked={checked.indexOf(choice) > -1} />
                            <ListItemText primary={choice} />
                        </MenuItem>
                    ))}
                </Select>

            </FormControl>

        </div>
    );
}




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export function SearchTextFilter({name, fields, filters, setFilters}) {
    const [checked, setChecked] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        const filters_ = {
            ...filters,
            [name] : {
                type: "SearchFilter",
                fields: [...fields],
                text: `${value}`
            }
        }
        setFilters(filters_)
    };

    return (
        <div>
            < Search >
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange = {handleChange}
                 />
            </Search>
        </div>
    );
}



