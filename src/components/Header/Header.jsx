import React, { useCallback, useState } from "react"
import {makeStyles} from "@material-ui/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import logo from "../../assets/img/icons/logo.png"
import {useDispatch, useSelector} from "react-redux"
import {getIsSignedIn} from "../../reducks/users/selectors"
import { push } from "connected-react-router"
import {HeaderMenus, ClosableDrawer} from "./index"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import SearchIcon from "@material-ui/icons/Search"


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuBar: {
        backgroundColor: "#fff",
        color: "#444",
    },
    toolBar: {
        margin: "0 auto",
        maxWidth: 1024,
        width: "100%",
        "& > img": {
            cursor: "pointer",
        }
    },
    iconButtons: {
        margin: "0 0 0 auto"
    },
    searchField: {
        [theme.breakpoints.up("sm")]:{
            alignItems: "center",
            display: "flex",
            marginLeft: 32
        },
        [theme.breakpoints.down("xs")]:{
            display: "none"
        }
    }
}))

const Header = () => {
    const classes = useStyles();
    const selector = useSelector( (state) => state);
    const isSignedIn = getIsSignedIn(selector);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState("");

    const handleDrawerToggle = useCallback( (event) => {
        if(event.type === "click" ){
            setOpen(!open);
        }
    }, [setOpen, open]);

    const inputKeyword = useCallback( event => {
        setKeyword(event.target.value)
    },[])


    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolBar}>
                    <img
                        src={logo} alt="Logo" width="140px"
                        onClick={ () => dispatch(push("/"))}
                    />
                    <div className={classes.searchField} >
                        <TextField
                            placeholder="商品を検索"
                            fullWidth={false}
                            multiline={false}
                            onChange={inputKeyword}
                            required={false}
                            rows={1}
                            value={keyword}
                            type={"text"}
                            onKeyDown={(event) => event.which === 13 && dispatch(push("/?search="+keyword))}
                        />
                        <IconButton className={classes.iconButton} onClick={() => dispatch(push("/?search=" + keyword))}>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    {isSignedIn && (
                        <div className={classes.iconButtons}>
                            <HeaderMenus
                                handleDrawerToggle={handleDrawerToggle}
                            />
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <ClosableDrawer open={open} onClose={handleDrawerToggle} />
        </div>
    )

}

export default Header
