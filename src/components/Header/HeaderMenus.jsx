import React, {useEffect} from "react";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import {getProductsInCart, getUserId, getFavoriteProducts} from "../../reducks/users/selectors"
import {useSelector, useDispatch} from "react-redux"
import {fetchProductsInCart, fetchFavoriteProducts} from "../../reducks/users/operations"
import {db} from "../../firebase/index"
import {push} from "connected-react-router"

const HeaderMenus = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state)
    const uid = getUserId(selector)
    let productsInCart = getProductsInCart(selector);
    let favoriteProducts = getFavoriteProducts(selector);

    useEffect(() => {
        const unsubscribe = db.collection("users").doc(uid).collection("cart")
            .onSnapshot(snapshots => {
                snapshots.docChanges().forEach(change => {
                    const product = change.doc.data();
                    const changeType = change.type;

                    switch(changeType) {
                        case "added":
                            productsInCart.push(product);
                            break;
                        case "modified":
                            const index = productsInCart.findIndex(product => product.cartId === change.doc.id);
                            productsInCart[index] = product;
                            break;
                        case "removed":
                            productsInCart = productsInCart.filter((product) => product.cartId !== change.doc.id)
                            break;
                        default:
                            break;
                    }
                });
                dispatch(fetchProductsInCart(productsInCart))
            });
            return () => unsubscribe()
    }, [])

    useEffect(() => {
        const unsubscribe = db.collection("users").doc(uid).collection("favorite")
            .onSnapshot(snapshots => {
                snapshots.docChanges().forEach(change => {
                    const product = change.doc.data();
                    const changeType = change.type;

                    switch(changeType) {
                        case "added":
                            favoriteProducts.push(product);
                            break;
                        case "modified":
                            const index = favoriteProducts.findIndex(product => product.favoriteId === change.doc.id);
                            favoriteProducts[index] = product;
                            break;
                        case "removed":
                            favoriteProducts = favoriteProducts.filter((product) => product.favoriteId !== change.doc.id)
                            break;
                        default:
                            break;
                    }
                });
                dispatch(fetchFavoriteProducts(favoriteProducts))
            });
            return () => unsubscribe()
    }, [])


    return (
        <>
            <IconButton onClick={() => dispatch(push("/cart"))} >
                <Badge badgeContent={productsInCart.length} color="secondary" >
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <IconButton onClick={() => dispatch(push("/favorite"))}>
                <Badge badgeContent={favoriteProducts.length} color="secondary" >
                    <FavoriteBorderIcon />
                </Badge>
            </IconButton>
            <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
                <MenuIcon />
            </IconButton>
        </>
    )
}

export default HeaderMenus
