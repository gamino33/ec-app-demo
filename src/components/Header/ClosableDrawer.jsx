import React, { useState, useCallback, useEffect} from "react"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText"
import {makeStyles } from "@material-ui/styles"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import HistoryIcon from "@material-ui/icons/History"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { useDispatch } from "react-redux"
import {push} from "connected-react-router"
import {signOut} from "../../reducks/users/operations"
import { db } from "../../firebase"
import { TextField } from "@material-ui/core"

const useStyles = makeStyles( (theme) => ({
    drawer: {
        [theme.breakpoints.up("sm")]: {
            flexShrink: 0,
            width: 256
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: 256
    },
    searchField: {
        alignItems: "center",
        display: "flex",
        marginLeft: 32
    }
}))

const ClosableDrawer = (props) => {
    const classes = useStyles();
    const {container} = props;
    const dispatch = useDispatch();

    const [keyword, setKeyword] = useState("");


    const inputKeyword = useCallback( (event) => {
        setKeyword(event.target.value);
    }, [setKeyword]);

    const selectMenu = (event, path) => {
        dispatch(push(path))
        props.onClose(event)
    }

    const [filters, setFiters] = useState([
        {func: selectMenu, label: "すべて",  id: "all", value: "/"},
        {func: selectMenu, label: "メンズ",  id: "male", value: "/?gender=male"},
        {func: selectMenu, label: "レディース",  id: "female", value: "/?gender=female"},
    ])

    useEffect( () => {
        db.collection("categories")
            .orderBy("order", "asc")
            .get()
            .then(snapshots => {
                const list = [];
                snapshots.forEach(snapshot => {
                    const category = snapshot.data();
                    list.push({func: selectMenu, label: category.name,  id: category.id, value: `/?category=${category.id}` })
                })
                setFiters(prevState => [...prevState, ...list]);
            })
        // eslint-disable-next-line
    },[])

    const menus = [
        {func: selectMenu, label: "商品登録", icon: <AddCircleIcon />, id: "register", value: "/product/edit"},
        {func: selectMenu, label: "注文履歴", icon: <HistoryIcon />, id: "history", value: "/order/history"},
        {func: selectMenu, label: "プロフィール",icon: <PersonIcon />, id: "profile", value: "/user/mypage"},
    ];


    return (
        <nav className={classes.drawer}>
            <Drawer
                container={container}
                variant="temporary"
                anchor="right"
                open={props.open}
                onClose={(event) => props.onClose(event)}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
            >
                <div
                    onClose={(event) => props.onClose(event)}
                    onKeyDown={(event) => props.onClose(event)}
                >
                    <div className={classes.searchField}>
                        <TextField
                            fullWidth={false}
                            label={"キーワードを入力"}
                            multiline={false}
                            onChange={inputKeyword}
                            required={false}
                            rows={1}
                            value={keyword}
                            type={"text"}
                            onKeyDown={(event) => event.which === 13 && selectMenu(event, "/?search=" + keyword)}
                        />
                        <IconButton onClick={(event) => selectMenu(event, "/?search=" + keyword)}>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {menus.map(menu => (
                            <ListItem button key={menu.id} onClick={(event) => menu.func(event, menu.value)}>
                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                        ))}
                        <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {filters.map(filter => (
                            <ListItem button key={filter.id} onClick={(event) => filter.func(event, filter.value)} >
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </nav>
    )

}

export default ClosableDrawer
