import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css'

const Products = ({datas}) => {
    return (
        <div className={styles.main}>
            <h1>This is products</h1>
            {
                datas?.subCategories?.length === 0 ?
                datas.products.map(item => <li key={item._id}>{item.name}</li> ) :
                datas.subCategories.map(item => <li key={item._id}>{item.subCategoryName}</li> )
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
    return { paths, fallback: false }
  }


  export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://ecommerce.devoretapi.co.uk/website/findCategoryAndProducts?isActive=true&storeId=1-2021&categoryId=${params.id}`)
    const datas = await res.json()
  
    // Pass post data to the page via props
    return { props: { datas }, revalidate: 10, }
  }