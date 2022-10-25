import type { NextPage } from 'next'
import { HomeService } from '../graphql'

const Home: NextPage = ({allData}:any) => {
  return (
    <>
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <ul>
      {allData.map((ele:any)=>{
        return<>
          <li key={ele.id}>{ele.id}</li>
         <li >{ele.attributes.product_name}</li>
        </>
      })}
    </ul>
    </div>
    </>
    
  )
}

export default Home

export async function  getServerSideProps() {


  // const { data } = await client.query({
  //   query: gql`
  //   query{
  //     products{
  //       data{
  //         attributes{
  //           desc
  //           product_name
  //         }
  //       }
  //     }
  //   }
  //   `
  // })
  const {data}= await HomeService();

  console.log(data.products.data,"====-");
  


  return {
    props: {
      allData: data.products.data

    }
  }
}