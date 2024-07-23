import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/user.slice";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { remove, add, updateQuantity, emptyCart } from "@/store/cart.slice.js";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Link } from "react-router-dom";
import axios from "axios";
import BlurFade from "@/components/magicui/blur-fade";

const NavbarRight = () => {
  const URI = import.meta.env.VITE_URI
  const cart = useSelector((state) => state.cart);
  const userDetails = useSelector((state) => state.user.userInfo);
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    toast({
      title: "Logged Out Successfully",
    });
    dispatch(emptyCart());
    
  };
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const handleLogin = () => {
    navigate("/log-in");
  };
  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const handleRemoveFromCart = (cartItem) => {
    const item = cartItems.find((item) => item._id === cartItem._id);
    if (item && item.quantity <= 0) {
      dispatch(remove(cartItem._id));
    }
    dispatch(remove(cartItem._id));
    toast({
      title: "Removed from Cart",
    });
  };
  const handleUpdateQuantity = (cartItem, newQuantity) => {
    dispatch(updateQuantity({ _id: cartItem._id, quantity: newQuantity }));
  };

  const handleFinalizeCart = async (cartItems) => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is Empty",
      });
      return;
    }
    const filteredCartItems = cartItems
      .filter((item) => item._id && item.quantity) // Ensure _id and quantity are present
      .map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      }));

    try {
      const response = await axios.post( `${URI}/api/v1/carts/create`, {
        items: filteredCartItems,
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      navigate("/order");
    } catch (error) {
      navigate("/");
    }
  };

  const handleOrderHistory = () => {
    navigate("/order-history");
  };

  return (
    <>
      {isLoggedIn && (
        <div className="absolute mr-[6.5rem] border border-black rounded-full w-[15px] flex justify-center items-center mb-12 bg-black text-white text-xs h-[15px] p-2 sm:mr-[-2rem] ">
          {cartItems.length}
        </div>
      )}
      <div className="h-full w-full flex overflow-y-hidden">
        <div className="left w-[33.33%] h-[100%]"></div>
        <div className="middle w-[33.33%] h-[100%] flex justify-center items-center">
          <Drawer>
            <DrawerTrigger>
              <BlurFade delay={0.25} inView>
                {isLoggedIn && <ShoppingCart className="text-black" />}
              </BlurFade>
            </DrawerTrigger>
            <DrawerContent className="max-h-[70vh] bg-[#F9D689]">
              <DrawerHeader className="overflow-y-auto scrollbar-hide ">
                <DrawerTitle className="flex justify-center items-center ">
                  Your Items
                </DrawerTitle>
                {cartItems.length === 0 && (
                  <div className="emptyCart w-[100%] h-[30vh] flex justify-center items-center">
                    <h1>Your Cart Is Empty </h1>
                  </div>
                )}
                {cartItems.map((cartItem) => {
                  return (
                    <div
                      key={cartItem._id}
                      className="w-[100%] sm:w-[100%] h-[15vh] sm:h-[30vh]  border-2 border-black rounded-xl flex "
                    >
                      <div className="w-[30%] h-[100%] p-2 flex justify-center items-center">
                        <img
                          src={cartItem?.images?.[0]}
                          alt=""
                          className="w-[100%] h-[100%] sm:w-[45%] sm:h-[80%]"
                        />
                      </div>
                      <div className="w-[30%] h-[100%] p-2 flex justify-center items-center">
                        <div className="w-[90%] h-[30%] sm:w-[40%] sm:h-[25%] flex rounded-xl overflow-hidden">
                          <Button
                            className="h-[100%] w-[30%] bg-[#973131]"
                            onClick={() =>
                              handleUpdateQuantity(
                                cartItem,
                                cartItem.quantity - 1
                              )
                            }
                          >
                            -
                          </Button>
                          <div className="w-[40%] h-[100%] flex justify-center items-center">
                            {cartItem.quantity}
                          </div>
                          <Button
                            className="w-[30%] h-[100%] bg-[#973131]"
                            onClick={() =>
                              handleUpdateQuantity(
                                cartItem,
                                cartItem.quantity + 1
                              )
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="w-[40%] h-[100%] p-2  flex justify-center items-center">
                        <section
                          className="w-[80%] h-[95%] sm:w-[50%] sm:space-y-4  p-2  overflow-hidden rounded-xl
                            sm:flex justify-center items-center"
                        >
                          <div className="w-[100%] h-[100%]">
                            <h1 className="text-xs sm:text-2xl">
                              {cartItem.name}
                            </h1>
                            <h1 className="text-xs sm:text-xl">{`Quantity : ${cartItem.quantity}`}</h1>
                            <Button
                              className="mt-2 bg-[#E0A75E] text-[#973131] hover:bg-[#973131] hover:text-[#E0A75E] w-[95%] h-[30%] rounded-lg sm:text-lg text-xs"
                              onClick={() => handleRemoveFromCart(cartItem)}
                            >
                              Remove Item
                            </Button>
                          </div>
                        </section>
                      </div>
                    </div>
                  );
                })}
              </DrawerHeader>
              <DrawerFooter>
                <Button
                  className="rounded-2xl"
                  onClick={() => handleFinalizeCart(cartItems)}
                >
                  Finalize Cart
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="right sm:w-[33.33%] sm:h-[100%] sm:flex sm:items-center sm:justify-center sm:overflow-y-hidden overflow-x-hidden w-[100rem] h-[10rem] flex justify-center ">
          {!isLoggedIn && (
            <BlurFade delay={0.25} inView>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="rounded-2xl mt-3 ">Sign-in/Up</Button>
                  
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-xl">
                  <DropdownMenuItem
                    className="rounded-xl"
                    onClick={handleLogin}
                  >
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="rounded-xl"
                    onClick={handleSignUp}
                  >
                    SignUp
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BlurFade>
          )}
          {isLoggedIn && (
            <div className="overflow-y-hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <BlurFade delay={0.25} inView>
                    <Avatar className="mt-5 sm:mt-3">
                      <AvatarImage src={userDetails.avatar} alt="User" />

                      <AvatarFallback>UI</AvatarFallback>
                    </Avatar>
                  </BlurFade>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-xl">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-xl"
                  onClick={()=>{
                    navigate('/profile')
                  }}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl"
                  onClick={()=>{
                    navigate('/dashboard')
                  }}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-xl"
                    onClick={handleOrderHistory}
                  >
                    Order History
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="rounded-xl"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarRight;
