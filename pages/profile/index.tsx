import { ProfileSection } from "../../sections/Profile";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store";
import BasicLayoutNoFooter from "layouts/basicNoFooter.layout";

const Profile = ({ data }: any) => {
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  return (
    <BasicLayoutNoFooter>
      <ProfileSection account={userData}/>
    </BasicLayoutNoFooter>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Profile;
