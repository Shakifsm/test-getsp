import React from 'react';
import Link from 'next/link';
import Image from 'next/img';
import styles from '../styles/Home.module.css'

const Products = ({datas}) => {
    return (
        <div className={styles.main}>
            <h1>This is subcategories & products </h1>
            {
                datas?.subCategories?.length === 0 ?
                datas.products.map(item => <div key={item._id}>
                  <h3>{item.name}</h3>
                  {
                                        item.images[0] ?
                                        <Image width='1000' height='1000' src={item.images[0].image} priority alt="category-img" />
                                        :
                                        <Image width={20} height={20} src='https://i.ibb.co/0CVGxQS/image-not-found-300x169.jpg' priority alt="category-img" />
                                    }
                </div> ) :
                datas.subCategories.map(item => <h3 key={item._id}>{item.subCategoryName}</h3> )
            }
            <Link href='/' passHref><button>Go Back</button></Link>
        </div>
    );
};

export default Products;

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch(`https://ecommerce.devoretapi.co.uk/website/findCategoryAndProducts?isActive=true&storeId=1-2021`);
  const data = await res.json();
  
    // Get the paths we want to pre-render based on posts
    const paths = data.categories.map((products) => ({
      params: { id: products._id },
      
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false,  }
  }


  export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    console.log(params);
    const res = await fetch(`https://ecommerce.devoretapi.co.uk/website/findCategoryAndProducts?isActive=true&storeId=1-2021&categoryId=${params.id}`)
    const datas = await res.json()
  
    // Pass post data to the page via props
    return { props: { datas }, revalidate: 10, }
  }