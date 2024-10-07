import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://149990825.v2.pressablecdn.com/wp-content/uploads/2023/09/Barcelona-1.jpg',
        address: 'Some address 5, 12345 Some City',
        description: 'This is a first meetup!'
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://img1.10bestmedia.com/Images/Photos/378847/GettyImages-1085317916_55_660x440.jpg',
        address: 'Some address 10, 12345 Some City',
        description: 'This is a second meetup!'
    }

];

const HomePage = (props) => {

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context){
//   const {req, res} = context;
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps(){
  // fetch data from an API
  const client = await MongoClient.connect("mongodb+srv://abdelrahmankasem7:8bmr6su4@cluster0.job85.mongodb.net/meetups");
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetups) => ({
        title: meetups.title,
        address: meetups.address,
        image: meetups.image,
        id: meetups._id.toString()
      }))
    },
    revalidate: 1
  };
}
export default HomePage;