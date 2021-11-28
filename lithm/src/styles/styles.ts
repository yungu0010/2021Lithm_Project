import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // 추가
        justifyContent: 'center'
    },
    //Auth 수정
    card: {
        flex: 1,
        marginTop: '35%',
        // maxHeight: 380,
        paddingBottom: '30%',
    },
    heading: {
        fontSize: 30,
        fontWeight: '500',
        marginLeft: '10%',
        color: 'black',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },  
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16, 
        minHeight: 40,
        color: 'black',
    },
    button: {
        width: '80%',
        backgroundColor: '#93cddd',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },  
    //makestudy
    container1: {
        flex: 1,
        backgroundColor:'white'
    },
    card1: {
        flex: 1,
        padding:'2%',
        marginTop: '35%',
        marginVertical : '10%',
        borderRadius: 20,
        maxHeight: 380,
        paddingBottom: '30%',
    },

    heading1: { 
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '30%',
        color: 'black',
    },
    form1: {
        flex: 1,
        justifyContent: 'center',
        padding: '3%'
    },
    inputs1: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '15%',
    },  
    title: {
        width: '90%',
        height:'20%',
        marginTop:5,
        borderBottomColor:'grey',
        borderBottomWidth:1,
        paddingTop: 10,
        fontSize: 18, 
        minHeight: 40,
        color: 'black',
    },
    input1: {
        width: '90%',
        height:'22%',
        marginTop:10,
        backgroundColor:'whitesmoke',
        paddingTop: 10,
        textAlign:'center',
        fontSize: 18, 
        fontWeight:'500',
        minHeight: 40,
        color: 'black',
        borderRadius:5,
        marginBottom:20,
    },
    leftText:{
        paddingLeft:2,
        paddingRight:5,
        fontSize:18,
        fontWeight:'500'
    },
    inputBorder:{
        height:40,
        textAlign:'center',
        borderBottomColor:'black',
        borderBottomWidth:1,
        fontSize: 18, 
        fontWeight:'500',
        minHeight: 40,
        color: 'black',
        borderRadius:5,
        padding:0,
        bottom:10
    },
    button1: {
        width: '80%',
        backgroundColor: '#93cddd',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:5,
    },
    buttonText1: {
        color: 'white',
        fontSize:20,
        fontWeight: '500'
    },
    //nostudy
    nostudy: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    buttonAlt: {
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: '#c9e6ee',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
});
export default styles;