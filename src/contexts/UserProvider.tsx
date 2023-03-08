import PropTypes from 'prop-types';
import {createContext, ReactNode, useContext} from 'react';
import {useMeQuery} from "../graphql/generated";
type userContextType = {
    me : ()=> any
};

const userContextDefaultValues: userContextType = {
    me: ()=> {return null}
};

type Props = {
    children: ReactNode;
};

const UserContext = createContext<userContextType>(userContextDefaultValues);

const UserProvider = ({ children } : Props) => {
    const {data,status,isError,isSuccess} = useMeQuery();

   const me = ()=>{
       return data;
   }

    return (
        <UserContext.Provider value={{ me }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.object,
};

const useUser = () => useContext(UserContext);

export { UserProvider as default, useUser };
