import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderComments({ commentsList }) {
  //I Can not use 'List' reactstrap
  const comments = commentsList.map((comments) => {
    return (
      <div className="mb-4" key={comments.id}>
        <div className="mb-2">{comments.comment}</div>
        <div>
          --{comments.author},{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(Date.parse(comments.date)))}
        </div>
      </div>
    );
  });
  return (
    <div className="container">
      <h4>Comments</h4>
      {comments}
    </div>
  );
}

const DishdetailComponent = (props) => {
  var dish = props.selectedDish;

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
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>

        <div className="col-12 col-md-5 m-1">
          <div className="row">
            <RenderComments commentsList={props.comments}></RenderComments>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishdetailComponent;
