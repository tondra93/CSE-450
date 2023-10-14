import {
  AppShell,
  Button,
  Card,
  Grid,
  Image,
  NativeSelect,
  Navbar,
  Radio,
  Text,
  Textarea,
} from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AnnotatorNavbar from "../components/annotatorNavbar";
import Page from "../components/page";
import connectDb from "../lib/db";
import { tagOptions } from "../utils/const";
import { tokenize } from "../utils/tokenize";
import { webSiteUrl } from "../utils/urls";
import LandingPage from "./landingPage";

const Annotation = ({ doc }) => {
  console.log(doc);
  const [comment, setComment] = useState<String>();
  const [genre, setGenere] = useState<String>();
  const [value, setValue] = useState(doc);
  const [tokens, setTokens] = useState([]);
  const [numberOfWords, setNumberOfWords] = useState<Number>(0);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = tokenize(value.data.sentence);
  //       const words = response;
  //       const wordsObject = words.map((e, idx) => {
  //         return {
  //           id: idx + 1,
  //           word: e,
  //         };
  //       });
  //       setTokens(wordsObject);
  //       setNumberOfWords(words.length);
  //     } catch (err) {}
  //   })();
  // }, [value.data.sentence]);

  const handleNext = async () => {
    const response = await axios.post("/api/dataset/update-photo", {
      comment,
      photo_id: value.data._id,
      token: localStorage.getItem("token"),
      genre,
    });

    const result = await axios.post("/api/dataset/get-photo", {
      token: localStorage.getItem("token"),
    });
    setValue(result.data);
    setComment("");
    setGenere("");
  };
  console.log({ genre });
  console.log(value);
  return (
    <AnnotatorNavbar>
      <div>
        {value &&
          (value.data !== "" ? (
            <>
              <div
                style={{
                  padding: "1rem",
                }}
              >
                <Image
                  radius="md"
                  height={400}
                  fit="contain"
                  src={value.data?.photo_url}
                />
              </div>
              <div style={{ marginTop: "2rem" }}>
                <Textarea
                  size="xl"
                  radius="lg"
                  placeholder="Input placeholder"
                  onChange={(e) => setComment(e.currentTarget.value)}
                />
              </div>
              <div style={{ marginTop: "2rem" }}>
                <NativeSelect
                  data={[
                    { label: "Hateful", value: "Hate" },
                    { label: "Non Hateful", value: "Non Hate" },
                  ]}
                  value={genre}
                  onChange={(e) => setGenere(e.currentTarget.value)}
                />
              </div>
              <div style={{ display: "flex", marginTop: "1rem", gap: "1rem" }}>
                <Button onClick={handleNext}> Next</Button>
              </div>
            </>
          ) : (
            <div style={{ border: "1px solid black", padding: "1rem" }}>
              {value.message}
            </div>
          ))}
      </div>
    </AnnotatorNavbar>
  );
};

export default Annotation;

export async function getServerSideProps(ctx: any) {
  await connectDb();
  const { token } = ctx.req.cookies;
  console.log(token);
  // const { data } = await axios.get(`${webSiteUrl}/api/dataset/get-photo`, {
  // const { data } = await axios.post(`/api/dataset/get-photo`, {
  //   token,
  // });
  return {
    props: {
      doc: { },
    },
  };
}
