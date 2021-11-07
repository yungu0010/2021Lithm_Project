import React, {useState} from "react";
import {BottomNavigation} from "react-native-paper";
import MakeStudy from "../screens/MakeStudy";

export default function Navigator(){
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 'scene1', title: 'MakeStudy', icon: 'post'},//makestudy
    ]);
    const renderScene = BottomNavigation.SceneMap({
        // 여기 씬 있는데에 Test의 파일 넣으면 됨 Login, Signup 같은거 쓰면됨
        scene1: MakeStudy,
});
    return <BottomNavigation navigationState={{index, routes}}
        onIndexChange={setIndex} renderScene={renderScene}/>;
}