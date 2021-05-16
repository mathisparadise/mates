import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";

import { Container, Content } from "native-base";
import { db } from "../App";

export default class ProfileDisplay extends React.Component {
  state = { profile: Object };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    db.collection("profiles")
      .doc("2")
      .get()
      .then((doc) => {
        this.setState({ profile: doc.data() });
      });
  }

  render() {
    var profile = this.state.profile;

    return (
      <Container style={styles.container}>
        <Content>
          <ScrollView>
            <View style={styles.profileHeader}>
              <Image style={styles.profilePic} source={{ uri: profile.photo }} />
              <Text style={styles.profileName}>@{profile.username}</Text>
            </View>
            <Text style={styles.title}>Interests</Text>
            {/* {Object.keys(profile).map((key, i) => {
              return (
                <Text style={styles.tribeName} key={i}>
                  {profile.interests[i]}
                </Text>
              );
            })} */}
            <Text>{Object.values(profile).map((i) => profile.interests)};</Text>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    marginBottom: 10,
  },
  tribeName: {
    fontSize: 20,
    width: "100%",
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: "5%",
    marginBottom: 10,
  },
});
