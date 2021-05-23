import React from "react";
import { FlatList, StyleSheet, View, Text, Image } from "react-native";

import { Container, Content } from "native-base";
import { db } from "../App";

export default class MateDisplay extends React.Component {
  state = { profile: Object };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({ loading: true })
    db.collection("profiles")
      .doc("1")
      .get()
      .then((doc) => {
        this.setState({profile: doc.data(), loading: false});
      });
  }

  renderItemComponent = (data) => <Text style={styles.interestName}>{data.item}</Text>

  render() {

    const { profile, loading } = this.state;

    const { interests } = profile;
  
    if(loading) {
      return <Text>Loading profile...</Text>
    }
    
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.profile}>
            <Image style={styles.profilePic} source={{ uri: profile.photo }} />
            <Text style={styles.profileName}>@{profile.username}</Text>
            <FlatList
              style={styles.interestsList}
              data={this.state.profile.interests}
              renderItem={item => this.renderItemComponent(item)}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
    justifyContent: 'center',
  },
  profile: {
    backgroundColor: "white",
    borderRadius: 40,
    padding: 20,
    margin: 15,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 999,
  },
  profileName: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    paddingTop: 10,
  },
  interestName: {
    overflow: 'hidden',
    borderRadius: 10,
    fontSize: 20,
    color: "white",
    textAlign: "left",
    marginBottom: 10,
    paddingLeft:15,
    paddingRight:15,
    lineHeight: 50,
    borderRadius: 15,
    backgroundColor: "#383838",
    margin: 5,
  },
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  }
});
