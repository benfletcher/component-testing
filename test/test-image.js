import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';

const should = chai.should();
const expect = chai.expect();

import Image from '../js/components/image';
import Gallery from '../js/components/gallery';

describe('Image component', function() {
  it('Renders the image and description',  function() {
    const url = "http://www.example.com/image.png";
    const description = "Example description";

    const renderer = TestUtils.createRenderer();
    renderer.render(<Image url={url} description={description} />);
    const result = renderer.getRenderOutput();
    result.props.className.should.equal('gallery-image');

    const img = result.props.children[0];
    img.type.should.equal('img');
    img.props.src.should.equal(url);
    img.props.alt.should.equal(description);

    const p = result.props.children[1];
    p.type.should.equal('p');
    p.props.children.should.equal(description);
  });
});

describe('Gallery component tests', function() {
  it('Displays a series of those images',  function() {
    const testData = [
      {
        url: "http://www.example.com/image1.png",
        description: "first description",
      },
      {
        url: "http://www.example.com/image2.png",
        description: "second description",
      }
    ];

    const renderer = TestUtils.createRenderer();
    renderer.render(<Gallery images={testData} />);
    const result = renderer.getRenderOutput();

    // testing parent
    result.props.className.should.equal('gallery');
    result.type.should.equal('div');

    // testing children array
    const imageArray = result.props.children;
    imageArray.should.be.an('array');
    imageArray.length.should.equal(2);

    // testing individual child
    const singleElement = imageArray[0];
    const { props } = singleElement;
    singleElement.type.should.equal(Image);

    props.url.should.equal(testData[0].url);
    props.description.should.equal(testData[0].description);

  });
});
