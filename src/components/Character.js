import React, { useState, useEffect } from 'react';

import Summary from './Summary';

const character = props => {
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
        props.selectedChar
    );
    setLoading(true);
    fetch('https://swapi.co/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
        setLoading(false)
        setLoadedCharacter(loadedCharacter)})
      .catch(err => {
        console.log(err);
      });
  };

   useEffect (() => {
    fetchData();
    return () => {
      console.log('cleaning up')
    };
   }, [props.selectedChar])

/*
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return (
      nextProps.selectedChar !== this.props.selectedChar ||
      nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
      nextState.isLoading !== this.state.isLoading
    );
  }

/*  componentDidUpdate(prevProps) {
    console.log('Component did update');
    if (prevProps.selectedChar !== this.props.selectedChar) {
      this.fetchData();
    }
  }
 
  componentDidMount() {
    this.fetchData();
  }

  
  componentWillUnmount() {
    console.log('Too soon...');
  }

  */

    let content = <p>Loading Character...</p>;

    if (!loading && loadedCharacter.id) {
      content = (
        <Summary
          name={loadedCharacter.name}
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          hairColor={loadedCharacter.colors.hair}
          skinColor={loadedCharacter.colors.skin}
          movieCount={loadedCharacter.movieCount}
        />
      );
    } else if (!loading && !loadedCharacter.id) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
  }

export default React.memo(character);
