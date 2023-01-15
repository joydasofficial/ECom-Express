import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Card from "../../components/Cards";
import styles from "./style.module.scss";
import Categories from "../../components/Categories";

//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/Features/ProductSlice";

const Products = () => {
  const router = useRouter();
  const [showProductsList, setShowProductsList] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCat, setSelectedCat] = useState('')

  const dispatch = useDispatch()

  const currUser = useSelector((state)=>state.user)
  const products = useSelector((state)=>state.product.list)

  useEffect(() => {
    if(currUser.id !== ''){
      fetchCategories()
      dispatch(fetchProducts())
    }else{
      router.push('/login')
    }
  }, []);

  useEffect(()=>{
    setShowProductsList(products)
  },[products])

  useEffect(()=>{
    showProducts()
  },[selectedCat])

  console.log(products);
  const fetchCategories = async () => {
    try {
      let clist = await axios.get('https://fakestoreapi.com/products/categories')
      setCategories(['all', ...clist.data])
    } catch (error) {
      console.log('error', error) 
    }
  }

  const showProducts = () => { 
    if(selectedCat==='all'){
      setShowProductsList(products)
    }else{
      let showPList = products.length>0 && products.filter((e)=>{
        return e.category === selectedCat
      })
      setShowProductsList(showPList)
    }
  }

  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.item1}>
          <h1>ECom Express</h1>
        </div>
        <div className={styles.item2}>
          <Categories list={categories} setSelectedCat={setSelectedCat}/>
        </div>
        <div className={styles.item3}>
          {showProductsList.length > 0 &&
            showProductsList.map((e, index) => {
              return <Card data={e} key={index} />;
            })}
        </div>
        <div className={styles.item4}>ECom Express @Copyright || 2023</div>
      </div>
    </>
  );
};

export default Products;
