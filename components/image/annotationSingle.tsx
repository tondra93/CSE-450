import { Button, Select } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { Loader } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import { Slider } from "@mantine/core";

import axios from "axios";

import Image from "next/image";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function AnnotationSingle({ imageUrl, nextPage, lastIdx }) {
  const [annotation, setAnnotation] = React.useState("");
  const [targetAudience, setTargetAudience] = React.useState("");
  const [imageText, setImageText] = useState("");
  const [classLabel, setClassLabel] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [relevance, setRevelvance] = useState("");
  const token = localStorage.getItem("token");

  //   const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const targetAudienceOptions = [
    "Gents",
    "Ladies",
    "Celebrity",
    "Religious",
    "Political",
    "Others",
  ];
  const classLabels = ["Hateful", "Non Hateful"];
  const relevancePercantages = [0, 25, 50, 75, 100].map((e) => e.toString());

  const submitAnnotation = async () => {
    // console.log("annotation", annotation);
    // console.log("targetAudience", targetAudience);
    // console.log("imageText", imageText);
    // console.log("classLabel", classLabel);

    if (
      !imageUrl ||
      !targetAudience ||
      !imageText ||
      !classLabel ||
      !relevance
    ) {
      alert("Please fill all the fields");
      return;
    }
    setSubmitting(true);
    const response = axios.post(
      "/api/dataset/save-image-label",
      {
        imageUrl,
        imageText,
        targetAudience,
        classLabel,
        relevance: parseInt(relevance),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast
      .promise(response, {
        pending: "Submitting...",
        success: "Submitted",
        error: "Error",
      })
      .then((response) => {
        // localStorage.setItem("")

        localStorage.setItem("lastIdx", (parseInt(lastIdx) + 1).toString());

        setImageText("");
        setTargetAudience("");
        setClassLabel("");
        setRevelvance("");
        setSubmitting(false);
        // nextPage();
        window.location.reload();
        // setSubmitting(false);
      })
      .catch((e) => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <ToastContainer />

      <Image alt="pic" src={imageUrl} height={500} width={500} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <TextInput
          placeholder="Write the text of the picture"
          onChange={(e) => {
            setImageText(e.target.value);
          }}
        />
        <Select
          data={targetAudienceOptions}
          placeholder="Select Target Audience"
          value={targetAudience}
          onChange={(e) => {
            setTargetAudience(e);
          }}
        />
        <Select
          data={classLabels}
          placeholder="Select Class Label"
          value={classLabel}
          onChange={(e) => {
            setClassLabel(e);
          }}
        />
        <Select
          data={relevancePercantages}
          placeholder="Relevance"
          value={relevance}
          onChange={(e) => {
            setRevelvance(e);
          }}
        />

        <Button
          onClick={() => {
            submitAnnotation();
          }}
        >
          {submitting ? <Loader color="gray" size="sm" /> : "Submit"}
        </Button>
        {/* {targetAudienceOptions.map((e) => {
            return <option value={e}>{e}</option>;
          })} */}
      </div>
    </div>
  );
}
