var assert = require('assert'),
  validateFuc = require('../lib/validateFuc.js'),
  nodeList = require('./asset/typeList.json');


describe('isEmpty', function () {
  it('pass', function () {
    assert.equal(validateFuc.isEmpty(null), true);
    assert.equal(validateFuc.isEmpty(''), true);
    assert.equal(validateFuc.isEmpty(undefined), true);
  });

  it('fail', function () {
    assert.equal(validateFuc.isEmpty('string'), false);
    assert.equal(validateFuc.isEmpty(123), false);
  });
});

describe('startEndWithSpace', function () {
  it('fail', function () {
    assert.equal(validateFuc.startEndWithSpace('asdasd'), false);
  });

  it('pass', function () {
    assert.equal(validateFuc.startEndWithSpace(' asd'), true);
    assert.equal(validateFuc.startEndWithSpace('asd '), true);
    assert.equal(validateFuc.startEndWithSpace(' asd '), true);

  });
});

describe('isBracketTwice', function () {
  it('fail', function () {
    assert.equal(validateFuc.isBracketTwice('{)asd( { }'), false);
    assert.equal(validateFuc.isBracketTwice('{}{asd( { }'), false);
  });

  it('pass', function () {
    assert.equal(validateFuc.isBracketTwice('{sdfsdf{sdf}sd}()'), true);
  });
});

describe('isNumberLike', function () {
  it('fail', function () {
    assert.equal(validateFuc.isNumberLike('123dsfsdf'), false);
    assert.equal(validateFuc.isNumberLike('asdas12312'), false);
    assert.equal(validateFuc.isNumberLike('asd'), false);
  });

  it('pass', function () {
    assert.equal(validateFuc.isNumberLike('123.123'), true);
  });
});

describe('isIntLike', function () {
  it('fail', function () {
    assert.equal(validateFuc.isIntLike('123asd'), false);
    assert.equal(validateFuc.isIntLike('asdv'), false);
    assert.equal(validateFuc.isIntLike('123.1'), false);
  });

  it('pass', function () {
    assert.equal(validateFuc.isIntLike('123'), true);
  });
});

describe('isShopPhone', function () {
  it('fail', function () {
    assert.equal(validateFuc.isShopPhone('asdsdfxmnc,vsjdlk'), false);
    assert.equal(validateFuc.isShopPhone('fsdfsdf234edv'), false);
    assert.equal(validateFuc.isShopPhone('({1})23$%%^#（232）4-123/123'), false);
  });

  it('pass', function () {
    assert.equal(validateFuc.isShopPhone('({1})232324-123/123'), true);
    assert.equal(validateFuc.isShopPhone('213123-234234/123123'), true);
  });
});

describe('isTime', function(){
  it('fail', function(){
    assert.equal(validateFuc.isTime('9:10'), false);
    assert.equal(validateFuc.isTime('119:10'), false);
    assert.equal(validateFuc.isTime('119:1220'), false);
    assert.equal(validateFuc.isTime('29:12'), false);
  });

  it('pass', function(){
    assert.equal(validateFuc.isTime('19:12:50'), true);
    assert.equal(validateFuc.isTime('19:12', 'hh:mm'), true);
  });
});

describe('isDecimal', function(){
  it('fail', function(){
    assert.equal(validateFuc.isDecimal('12.122', 2), false);
    assert.equal(validateFuc.isDecimal('ab.12', 2), false);
    assert.equal(validateFuc.isDecimal('192.', 2), false);
  });

  it('pass', function(){
    assert.equal(validateFuc.isDecimal('12.12', 2), true);
    assert.equal(validateFuc.isDecimal('19', 2), true);
    assert.equal(validateFuc.isDecimal('19.1', 2), true);
  });
});
