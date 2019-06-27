import jsonPlaceholder from '../apis/jsonPlaceholder'
import _ from 'lodash';

export const FETCH_POST = 'FETCH_POST';
export const FETCH_USER = 'FETCH_USER';

export const fetchPostsAndUsers=()=> async (dispatch,getState) =>{
await dispatch(fetchPost())
const userIds=_.uniq(_.map(getState().posts,'userId'));
userIds.forEach(id=>dispatch(fetchUser(id)));

_.chain(getState().posts)
.map('userId')
.uniq()
.forEach(id=>dispatch(fetchUser(id)))

}



export const fetchPost = ()=> async dispatch=>{
    const response = await jsonPlaceholder.get('./posts')
    
    dispatch({type:FETCH_POST,response:response.data})
};



export const fetchUser = (id) =>async dispatch=> {
  const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: FETCH_USER, response: response.data});
};

// export const fetchUser = (id) => dispatch=> _fetchUser(id,dispatch);


// const _fetchUser=_.memoize(async(id,dispatch)=>{
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({ type: FETCH_USER, response: response.data});
// });