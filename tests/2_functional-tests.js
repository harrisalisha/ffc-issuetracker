const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);
/**
 * TO TEST UncOmment .env NODE_ENV
 * Write the following tests in tests/2_functional-tests.js:

Create an issue with every field: POST request to /api/issues/{project}
Create an issue with only required fields: POST request to /api/issues/{project}
Create an issue with missing required fields: POST request to /api/issues/{project}
View issues on a project: GET request to /api/issues/{project}
View issues on a project with one filter: GET request to /api/issues/{project}
View issues on a project with multiple filters: GET request to /api/issues/{project}
Update one field on an issue: PUT request to /api/issues/{project}
Update multiple fields on an issue: PUT request to /api/issues/{project}
Update an issue with missing _id: PUT request to /api/issues/{project}
Update an issue with no fields to update: PUT request to /api/issues/{project}
Update an issue with an invalid _id: PUT request to /api/issues/{project}
Delete an issue: DELETE request to /api/issues/{project}
Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
Delete an issue with missing _id: DELETE request to /api/issues/{project}
 */
let deleteId;
suite("Functional Tests", function () {
  suite("Routing test", function () {
    suite("3 post request test", function(){
        test("Create an issue with every field: POST request to /api/issues/{project}",
        function (done) {
            chai
          .request(server)
          .post("/api/issues/project")
          .set("content-type", "application/json")
          .send({
            issue_title: "Issue",
            issue_text: "Functional Test",
            created_by: "fcc",
            assigned_to: "Dom",
            status_text: "Not Done",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            deleteId = res.body._id;
            assert.equal(res.body.issue_title, "Issue");
            assert.equal(res.body.issue_text, "Functional Test");
            assert.equal(res.body.created_by, "fcc");
            assert.equal(res.body.assigned_to, "Dom");
            assert.equal(res.body.status_text, "Not Done");
            done();
          });
        })
    

    test("Create an issue with only required fields: POST request to /api/issues/{project}",
      function (done) {
        chai
          .request(server)
          .post("/api/issues/project")
          .set("content-type", "application/json")
          .send({
            issue_title: "Issue",
            issue_text: "Functional Test",
            created_by: "fcc",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, "Issue");
            assert.equal(res.body.issue_text, "Functional Test");
            assert.equal(res.body.created_by, "fcc");
            assert.equal(res.body.assigned_to, "");
            assert.equal(res.body.status_text, "");
            done();
          }); 
      }
    );

    test("Create an issue with missing required fields: POST request to /api/issues/{project}",
      function (done) {
        chai
          .request(server)
          .post("/api/issues/project")
          .set("content-type", "application/json")
          .send({
            issue_title: "",
            issue_text: "",
            created_by: "fcc",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "required field(s) missing");
            done();
          });
           
      });

    })
  });
    /*******GET TEST */

    suite("3 get request tests", function(){
        test( "View issues on a project: GET request to /api/issues/{project}", function(done){
            chai
           .request(server)
           .get("/api/issues/test-data")
           
           .end( function(err, res){
              assert.equal(res.status, 200);
              assert.equal(res.body.length, 1)
              done();
            })          
        })

        test("View issues on a project with one filter: GET request to /api/issues/{project}", function(done) {
            chai
              .request(server)
              .get("/api/issues/test-data")
           .query({
            _id:"62c479cc5259f01bd00e29e2"
           })
           .end( function(err, res){
              assert.equal(res.status, 200);
              //assert.equal(res.data);
              assert.deepEqual(res.body[0], {
                issue_title: "test",
                issue_text: "abc",
                created_on: "2022-07-05T17:50:04.179Z",
                updated_on: "2022-07-05T17:50:04.179Z",
                created_by: "abc",
                assigned_to: "",
                open: true,
                status_text: "",
                _id: "62c479cc5259f01bd00e29e2"
              });
              done();
            })             
        })

        test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function(done){
            chai
              .request(server)
              .get("/api/issues/test-data")
              .query({
                _id: "62c479cc5259f01bd00e29e2",
                issue_title: "test"
              })
              .end( function(err, res){
                assert.equal(res.status, 200);
                //assert.equal(res.data);
                assert.deepEqual(res.body[0], {
                  issue_title: "test",
                  issue_text: "abc",
                  created_on: "2022-07-05T17:50:04.179Z",
                  updated_on: "2022-07-05T17:50:04.179Z",
                  created_by: "abc",
                  assigned_to: "",
                  open: true,
                  status_text: "",
                  _id: "62c479cc5259f01bd00e29e2"
                });
                done();
              })
        })

    })
       
    
    /****PUT TEST */
    suite("5 PUT tests", function(){
        test("Update one field on an issue: PUT request to /api/issues/{project}", function(done){
            chai
              .request(server)
              .put("/api/issues/test-data-put")
              .send({
                _id: "62c47f139bb1f7fb3b9fdcc1",
                issue_title: "different"
              })
              .end( function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.result, "successfully updated");
                assert.equal(res.body._id, "62c47f139bb1f7fb3b9fdcc1");
                done();
              })
        })

        test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function(done){
            chai
              .request(server)
              .put("/api/issues/test-data-put")
              .send({
                _id: "62c47f139bb1f7fb3b9fdcc1",
                issue_title: "different again",
                issue_text: "updated"

              })
              .end( function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.result, "successfully updated");
                assert.equal(res.body._id, "62c47f139bb1f7fb3b9fdcc1");
                done();
              })
        })

        test("Update an issue with missing _id: PUT request to /api/issues/{project}", function(done){
            chai
              .request(server)
              .put("/api/issues/test-data-put")
              .send({
                _id: "",
              })
              .end( function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "missing _id");
                done();
              })
        })

        test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function(done){
            chai
              .request(server)
              .put("/api/issues/test-data-put")
              .send({
                _id: "62c47f139bb1f7fb3b9fdcc1"
              })
              .end( function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "no update field(s) sent");
                done();
              })
        })

        test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function(done){
            chai
              .request(server)
              .put("/api/issues/test-data-put")
              .send({
                _id: "62c47f139bb1f7fb3b9fdcc0",
                issue_title: "different again",
                issue_text: "updated"
              })
              .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "could not update");
                done();
              })
        })
    })
           
    
    /****DELETE TEST */
    suite("3 delete tests", function (){
        test("Delete an issue: DELETE request to /api/issues/{project}", function(done){
            chai
               .request(server)
               .delete("/api/issues/test-data-delete")
               .send({
                _id: "62c49011e6c22decae4f3182"
               })
               .end(function(err, res){
                    assert.equal(res.status, 200);
                    assert.equal(res.body.result,  "successfully deleted");
                    done();
               })
        })

        test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function(done){
            chai
            .request(server)
            .delete("/api/issues/test-data-delete")
            .send({
             _id: "62c48caeae0a5ae8dccf28ee"
            })
            .end(function(err, res){
                 assert.equal(res.status, 200);
                 assert.equal(res.body.error, "could not delete");
                 done();
            })
        })

        test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function(done){
            chai
            .request(server)
            .delete("/api/issues/test-data-delete")
            .send({
             _id: ""
            })
            .end(function(err, res){
                 assert.equal(res.status, 200);
                 assert.equal(res.body.error, "missing _id");
                 done();
            })
        })
    })
  
});
