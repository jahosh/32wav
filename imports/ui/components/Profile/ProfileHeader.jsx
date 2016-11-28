import React from 'react';

export const ProfileHeader = (props) => (
  <div className="col l12  center-align mainProfile">
    <div className="col l10 offset-l1 s12" id="profile-header">
      <div className="col l2">
        <span className="user-avatar profile-pic" style={{"background": 'url(' + props.user[0].profile_img + ')'}}></span>
        <br />
      </div>
      <div className="col l2" id="user-info">
        <div className="" id="profile-name">
        <h3 className="center-align" id="user-name">
          {props.params.username}
        </h3>
        <p className="flow-text" id="user-tagline">{props.user[0].bio ? `${props.user[0].bio}` : ''} </p>
      </div>           
    </div>
    <div className="col l4" id="">            
    </div>
  </div>
  <div className="col l10 offset-l1 s12">
    <table className="centered">
      <thead>
        <tr>
          <th data-field="id">Orgin</th>
          <th data-field="id">twitter</th>
          <th data-field="id">Member Since:</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Los Angeles, CA</td>
          <td>
            { props.user[0].twitter ? <a href={`http://twitter.com/${props.user[0].twitter}`}>  
            <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
            : '' }
          </td>
          <td>
            { props.user[0].createdAt ? `${props.user[0].createdAt}` : '' }
          </td>
        </tr>
      </tbody>
    </table>  
    <br />
  </div>
</div>
);