import React from "react";
import { Button, View, StyleSheet, SafeAreaView, Alert } from "react-native";
import { Amplify} from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import outputs from "./amplify_outputs.json";
import { deleteUser } from 'aws-amplify/auth';
Amplify.configure(outputs);

const SignOutButton = () => {
  const { signOut } = useAuthenticator();

  return (
    <View style={styles.signOutButton}>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

const DeleteAccountButton = () => {
  const handleDeleteUser = async () => {
    try {
      await deleteUser();
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = () => {
    // console.log(Auth);

    console.log("Delete button pressed"); // Debugging log
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      handleDeleteUser();
    }
  };

  return (
    <View style={styles.deleteAccountButton}>
      <Button title="Delete Account" onPress={confirmDelete} color="red" />
    </View>
  );
};

const App = () => {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <SafeAreaView>
          <SignOutButton />
          <DeleteAccountButton />
        </SafeAreaView>
      </Authenticator>
    </Authenticator.Provider>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    alignSelf: "flex-end",
  },
  deleteAccountButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
});

export default App;