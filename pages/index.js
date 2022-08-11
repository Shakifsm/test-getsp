import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.css'

export default function Home({data}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {
          data?.categories?.map(item => <div key={item._id}>
            <li>{item.categoryName}</li>
            <Link href={item._id}><button>Click</button></Link>
          </div> )
        }
      </main>

      
    </div>
  )
}


export async function getStaticProps(context) {
  const res = await fetch(`https://ecommerce.devoretapi.co.uk/website/findCategoryAndProducts?isActive=true&storeId=1-2021`);
  const data = await res.json();
  return {
    props: {  data },
    revalidate: 10, // will be passed to the page component as props
  }
}

