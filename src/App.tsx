import React, { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import * as THREE from "three";
// https://kronbits.itch.io/textures8bit
// 素材はこちらのものを使用しました。
// 他で使用する際は購入してください。
// I used this material.
// Please purchase it when using it elsewhere.
import texture1 from "./assets/img/texture_floor3_normal_light_px.png";
import texture2 from "./assets/img/texture_floor_octogons.png";
import texture3 from "./assets/img/texture_floortile_8.png";
import texture4 from "./assets/img/texture_new2_water_px.png";
import texture5 from "./assets/img/texture_new_bluerocks.png";
import texture6 from "./assets/img/texture_rocks_moss_px.png";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center"
  }
});

// ボックスのテクスチャ
const loader = new THREE.TextureLoader();
const textures = [
  loader.load(texture1),
  loader.load(texture2),
  loader.load(texture3),
  loader.load(texture4),
  loader.load(texture5),
  loader.load(texture6)
];

// スカイボックス用のテクスチャ
const skyBoxLoader = new THREE.CubeTextureLoader();
const skyboxTexture = skyBoxLoader.load([
  texture4,
  texture4,
  // 天井
  texture1,
  // 底
  texture5,
  texture4,
  texture4
]);

/*
 * 2.すべての面に同じテクスチャのボックス
 */
const Box = (props) => {
  const [textureNum, setTextureNum] = useState(3);
  // hooks
  const mesh = useRef();
  // 回転させる
  useFrame(() => {
    mesh.current.rotation.y += 0.01;
    mesh.current.rotation.x += 0.01;
  });
  return (
    <mesh
      {...props}
      ref={mesh}
      // クリックするたびにテクスチャを変更
      onClick={(e) => {
        setTextureNum(textureNum >= textures.length - 1 ? 0 : textureNum + 1);
      }}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial map={textures[textureNum]} />
    </mesh>
  );
};
function App() {
  return (
    <View style={styles.container}>
      <Canvas camera={{ position: [0, 2, 4], near: 0.1, far: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {/* <CameraController /> */}
        {/* <SkyBox /> */}
        <Box position={[-1, 1, 0]} />
        {/* <Box2 position={[1, -1, 0]} /> */}
      </Canvas>
    </View>
  );
}

export default App;
