import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import LaunchItem from './launch_item';
import MissionKey from './mission_key'

const launches_query = gql`

    query LaunchesQuery{
        launches {
            flight_number
            mission_name
            launch_year
            launch_success
            launch_date_local

        }

    }
    
`;

export class launches extends Component {
  render() {
    return (  
      <Fragment>
        <h1 className="display-4 my-3">Launches</h1>
        <MissionKey />
        <Query query={launches_query}>
            {
                ({loading,error,data}) => {
                    if(loading) return <h4>loading ...</h4>
                    if(error) return console.log(error)
                    console.log(data)

                    return <Fragment>
                        {
                            data.launches.map( launch => (
                                <LaunchItem key={launch.flight_number} launch={launch}/>
                            )

                            )
                        }
                    </Fragment>
                }
            }
        </Query>
      </Fragment>
    )
  }
}

export default launches
