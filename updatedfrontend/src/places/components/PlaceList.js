import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';
import './PlaceList.css';

const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItem
          key={place._id}
          id={place._id}
          image={"http://localhost/public/"+place.place_picture}
          title={place.place_name}
          description={place.location_name}
          address={place.location_address}
          creatorId={"place.creator"}
          coordinates={"place.location"}
          removeplaces={props.removeplaces}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
