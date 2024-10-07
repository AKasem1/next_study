import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import Head from 'next/head';
import { Fragment } from 'react';

const MeetupDetails = (props) => {
    return (
        <Fragment>
            <Head>
                <title>{props.meetups.title}</title>
                <meta name="description" content={props.meetups.description} />
            </Head>
            <MeetupDetail
            title = {props.meetups.title}
            image= {props.meetups.image}
            address= {props.meetups.address}
            description= {props.meetups.description}
            />
        </Fragment>
    );
};

export async function getStaticPaths(){
    const client = await MongoClient.connect("mongodb+srv://abdelrahmankasem7:8bmr6su4@cluster0.job85.mongodb.net/meetups");
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({},{_id: 1}).toArray();
    client.close();
    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {meetupId: meetup._id.toString()}
        }))
    }
}

export async function getStaticProps(context){
    const { meetupId } = context.params;
    console.log(meetupId);
    // fetch data from an API
    const client = await MongoClient.connect("mongodb+srv://abdelrahmankasem7:8bmr6su4@cluster0.job85.mongodb.net/meetups");
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId)});
    console.log(meetup);
    client.close();
    return {
      props: {
        meetups: {
          id: meetupId,
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          description: meetup.description
        }
      },
      revalidate: 1
    };
  }

export default MeetupDetails;