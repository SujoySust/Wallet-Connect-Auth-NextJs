import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useLoader } from "react-three-fiber";
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  Html,
  useProgress,
} from "@react-three/drei";
import { useWindowSize } from "hooks/useWindowSize";
import { Loading } from "components/Loader/Loading";
import useTranslation from "next-translate/useTranslation";

function Model(props: any) {
  const { scene, animations, loading } = useGLTF(props.src);
  console.log(loading, "props.src");
  const { actions } = useAnimations(animations, props.group);
  return <primitive object={scene} />;
}
const ThreeDViewer = ({ threeSrc }: any) => {
  const group = useRef();
  useEffect(() => {
    console.log("complete");
  }, [threeSrc.complete]);
  return (
    <Canvas pixelRatio={[1, 2]} camera={{ position: [-10, 15, 15], fov: 100 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} />
      <Suspense fallback={<Loader />}>
        <Model src={threeSrc} group={group} />
      </Suspense>

      {/* @ts-ignore */}
      <OrbitControls />
    </Canvas>
  );
};

function Loader() {
  const { progress } = useProgress();
  const { t } = useTranslation("common");
  return (
    <Html
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        transform: "translate3d(-60px, -40px, 0px) scale(1)",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "var(--primary-color)",
          paddingRight: 15,
          paddingLeft: 15,
          paddingTop: 10,
          paddingBottom: 7,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "15px",
          color: "white",
        }}
      >
        <h3>{progress}%</h3> <h3 className="ml-2">{t("loaded")}</h3>
      </div>{" "}
    </Html>
  );
}
export default ThreeDViewer;
