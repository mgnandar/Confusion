import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.name,
      values.comment
    );
  }
  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>

        <Modal
          animation={false}
          isOpen={this.state.isModalOpen}
          toggle={this.toggleModal}
        >
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={2}>
                  Rating
                </Label>
                <Col md={10}>
                  <Control.select
                    model=".rating"
                    className="form-control"
                    id="rating"
                    name="rating"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="name" md={2}>
                  name
                </Label>
                <Col md={10}>
                  <Control.input
                    model=".name"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="comment" md={2}>
                  Comment
                </Label>
                <Col md={10}>
                  <Control.textarea
                    model=".comment"
                    className="form-control"
                    id="comment"
                    name="comment"
                    row="6"
                  />
                </Col>
              </Row>

              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderComments({ commentsList, postComment, dishId }) {
  //I Can not use 'List' reactstrap
  // const comments = commentsList.map((comments) => {
  //   return (
  //     <Stagger in>
  //       <Fade in>
  //         <div className="mb-4" key={comments.id}>
  //           <div className="mb-2">{comments.comment}</div>
  //           <div>
  //             --{comments.author},{" "}
  //             {new Intl.DateTimeFormat("en-US", {
  //               year: "numeric",
  //               month: "short",
  //               day: "2-digit",
  //             }).format(new Date(Date.parse(comments.date)))}
  //           </div>
  //         </div>
  //       </Fade>
  //     </Stagger>
  //   );
  // });

  if (commentsList != null)
    return (
      <div className="col-12 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>
            {commentsList.map((comment) => {
              return (
                <Fade in>
                  <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>
                      -- {comment.author} ,{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(Date.parse(comment.date)))}
                    </p>
                  </li>
                </Fade>
              );
            })}
          </Stagger>
        </ul>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );

  // return (
  //   <div className="container">
  //     <h4>Comments</h4>
  //     {comments}
  //     <CommentForm dishId={dishId} postComment={postComment} />
  //   </div>
  // );
}

const DishdetailComponent = (props) => {
  var dish = props.selectedDish;

  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.selectedDish != null) {
    return (
      <div className="container">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <FadeTransform
              in
              transformProps={{
                exitTransform: "scale(0.5) translateY(-50%)",
              }}
            >
              <Card>
                <CardImg
                  width="100%"
                  src={baseUrl + dish.image}
                  alt={dish.name}
                />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
              </Card>
            </FadeTransform>
          </div>

          <div className="col-12 col-md-5 m-1">
            <div className="row">
              <RenderComments
                commentsList={props.comments}
                postComment={props.postComment}
                dishId={props.selectedDish.id}
              ></RenderComments>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default DishdetailComponent;
