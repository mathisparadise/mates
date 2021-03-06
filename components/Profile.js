import React from "react";
import { FlatList, StyleSheet, View, Text, ScrollView, Image } from "react-native";

import { Container, Content } from "native-base";
import { db } from "../App";

export default class ProfileDisplay extends React.Component {
  state = { profile: Object };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({ loading: true })
    db.collection("profiles")
      .doc("2")
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
          <View style={styles.profileHeader}>
            <Image style={styles.profilePic} source={{ uri: profile.photo }} />
            <Text style={styles.profileName}>@{profile.username}</Text>
          </View>
          <Text style={styles.title}>Interests</Text>
          <View style={styles.interestsListContainer}>
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
    backgroundColor: "white",
    justifyContent: 'center',
  },
  profileHeader: {
    alignItems: "center",
  },
  profilePic: {
    width: 200,
    height: 200,
    margin: 20,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: "#ff2b4b",
  },
  profileName: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    width: "100%",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: "5%",
    marginBottom: 20,
  },
  interestName: {
    overflow: 'hidden',
    borderRadius: 10,
    fontSize: 20,
    color: "white",
    textAlign: "left",
    paddingLeft:15,
    paddingRight:15,
    lineHeight: 50,
    borderRadius: 15,
    backgroundColor: "#383838",
    marginLeft: 15,
    marginBottom: 5
  },
  interestsList: {
    flexWrap: 'wrap',
    flex: 1,
  }
});
