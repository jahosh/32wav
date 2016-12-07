import React, { Component } from 'react';
import { Bert } from 'meteor/themeteorchef:bert';

export class FileShare extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  send(e) {
    e.preventDefault();
    console.log('send here');
    const self = this;
    const file = $("#profile-pic-upload")[0].files[0];

    console.log(file);
    let data = file;


/*
    fetch("https://file.io", {
      method: "POST",
      body: new FormData({"file": file})
    })
    */

     
    $.ajax({
      url: "https://file.io",
      type: "POST",
      processData: false,
      dataType: 'json',
      data: data,
      success: function(res) {
        console.log(JSON.parse(res));
      },
      error: function(xhr, status) {
        console.log(xhr);
      }
    });
    
    

  }
  render() {
    return (
      <div className="center-align">
        <h3 className="center-align">Encrypted Song Send</h3>
          <button onClick={this.send} className="btn waves-effect waves-light" type="submit" name="action">Submit
            <i className="material-icons right">send</i>
          </button>
           <form onChange={this.send}>
              <div className="file-field input-field">
                <div className="btn">
                  <span>File</span>
                  <input type="file" id="profile-pic-upload" />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
            </form>
      </div>
    );
  }
}
