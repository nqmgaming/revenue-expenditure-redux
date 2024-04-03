import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import {
  fetchData,
  deleteData,
  addData,
  updateData,
  searchData,
  resetSearch,
} from "@/redux/action/actions";
import { State } from "expo-router/build/fork/getPathFromState";
import { RootState } from "@/redux/store";

const index = () => {
  const dispatch = useDispatch();
  const reEx = useSelector((state: RootState) => state.dataReducer.listReEx);
  const [search, setSearch] = useState("");
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [date, setdate] = useState("");
  const [type, setType] = useState(true);
  const [amount, setamount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const totalIncome = useSelector(
    (state: RootState) => state.dataReducer.totalIncome
  );
  const totalExpense = useSelector(
    (state: RootState) => state.dataReducer.totalExpense
  );
  const searchResults = useSelector(
    (state: RootState) => state.dataReducer.searchResults
  );

  useEffect(() => {
    dispatch(fetchData());
    console.log(reEx);
  }, [dispatch]);

  const handleAddReEx = () => {
    const newReEx = {
      title,
      description,
      date,
      type: type ? "income" : "expense",
      amount,
    };
    dispatch(addData(newReEx)).then(() => dispatch(fetchData()));
    setModalVisible(false);
    clearForm();
  };

  const handleDeleteReEx = (id) => {
    Alert.alert(
      "Are you sure?",
      "Do you want to delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(deleteData(id)).then(() => dispatch(fetchData()));
          },
        },
      ],
      { cancelable: false }
    );
  };
  const handleUpdateReEx = () => {
    const updatedReEx = {
      title,
      description,
      date,
      type: type ? "income" : "expense",
      amount,
    };
    dispatch(updateData(editItem._id, updatedReEx)).then(() =>
      dispatch(fetchData())
    );
    setModalVisible(false);
    //clear form
    clearForm();
  };
  const clearForm = () => {
    settitle("");
    setdescription("");
    setdate("");
    setType(true);
    setamount(0);
    setEditItem(null);
  };

  const handleEditReEx = (item) => {
    settitle(item.title);
    setdescription(item.description);
    setdate(item.date);
    setType(item.type === "income"); // convert string to boolean
    setamount(item.amount);
    setEditItem(item);
    setModalVisible(true);
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      dispatch(searchData(text));
      console.log(searchResults);
    } else {
      dispatch(resetSearch());
    }
  };

  return (
    <View
      style={{
        padding: 10,
        flex: 1,
      }}
    >
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={24} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={handleSearch}
          value={search}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Thống kê</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              backgroundColor: "lightgreen",
              flex: 1,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <FontAwesome name="money" size={24} color="green" />
            <Text
              style={{
                fontWeight: "bold",
                color: "green",
              }}
            >
              Total Income: {totalIncome}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              backgroundColor: "pink",
              flex: 1,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <FontAwesome name="money" size={24} color="red" />
            <Text
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              Total Expense: {totalExpense}
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={search ? searchResults : reEx}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.container,
              {
                backgroundColor: item.type === "income" ? "lightgreen" : "pink",
              },
            ]}
          >
            <View
              style={[
                styles.textContainer,
                {
                  backgroundColor:
                    item.type === "income" ? "lightgreen" : "pink",
                },
              ]}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.type}>{item.type}</Text>
              <Text style={styles.amount}>{item.amount}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleEditReEx(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleDeleteReEx(item._id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        style={styles.centeredView}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              onChangeText={(text) => settitle(text)}
              value={title}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              onChangeText={(text) => setdescription(text)}
              value={description}
            />
            <TextInput
              style={styles.input}
              placeholder="Date"
              onChangeText={(text) => setdate(text)}
              value={date}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                gap: 10,
              }}
            >
              <Text style={styles.label}>income?</Text>
              <Checkbox value={type} onValueChange={setType} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Amount"
              onChangeText={(text) => setamount(Number(text))}
              value={String(amount)}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={editItem ? handleUpdateReEx : handleAddReEx}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {editItem ? "Update" : "Add"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Fab */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="pluscircleo" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#eee",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,
  },
  type: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 80,
    height: 30,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  searchInput: {
    padding: 10,
    flex: 1,
  },
  input: {
    padding: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: 250,
    marginBottom: 10,
  },
  fab: {
    position: "absolute",
    bottom: 80,
    left: 20,
    backgroundColor: "#aabcde",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: 60,
    height: 60,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
    height: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
