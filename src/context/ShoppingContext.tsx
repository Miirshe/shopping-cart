import { createContext, ReactNode, useContext, useState } from "react"
type ChildrenProps = {
	children: ReactNode
}

type CartItems = {
	id: number,
	quantity: number
}

type ShoppingCartContext = {
	increaseQuantity: (id: number) => void,
	descreaseQuantity: (id: number) => void,
	removeQuantity: (id: number) => void,
	getItemQuantity: (id: number) => number,
	cartItems : CartItems[],
	cartQuantity : number
}
const ShoppingContext = createContext({} as ShoppingCartContext);

export function useShopContext() {
	return useContext(ShoppingContext)
}

export default function ShoppingCartProvider({ children }: ChildrenProps) {
	const [cartItems, setCartItem] = useState<CartItems[]>([]);

	function getItemQuantity(id: number) {
		return cartItems.find(item => item.id == id)?.quantity || 0
	}
	function removeQuantity(id:number) {
		setCartItem(currItems => {
			return currItems.filter(item => item.id !== id );
		})
	}

	function increaseQuantity(id:number){
		setCartItem(currItems => {

			if(currItems.find(item => item.id == id)?.quantity == null){
				return [...currItems,{id , quantity: 1 }];
			}else{
				return currItems.map(item => {
					if(item.id == id){
						return {...item , quantity:item.quantity + 1};
					}else{
						return item;
					}
				})
			}

		})
	}

	function descreaseQuantity(id :number){

		setCartItem( currItems => {

			if(currItems.find(item => item.id == id )?.quantity == 1){
				return currItems.filter(item => item.id != id);
			}else{
				return currItems.map(item => {
					if(item.id == id){
						return {...item,quantity : item.quantity - 1}
					}else{
						return item;
					}
				})
			}

		})

	}

	const cartQuantity = cartItems.reduce((quantity , item) =>  item.quantity + quantity,0)

	return (
		<ShoppingContext.Provider value={{ getItemQuantity, increaseQuantity, descreaseQuantity, removeQuantity , cartItems , cartQuantity }}>
		{children}
	</ShoppingContext.Provider>
	)
}