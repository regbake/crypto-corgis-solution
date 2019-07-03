import "allocator/arena";
export { memory };

import { context, storage, near, collections, base64 } from "./near";
import { Corgi, CorgiArray, CorgiMetaData } from "./model.near";

export {CorgiTokenMarket} ;

// --- contract code goes below
///////////////////////////////
// ERC721 for Non Fungible Tokens

class CorgiTokenMarket {
  // Constant Terms for Corgi
  NAME: string = "The NEAR Corgi Token";
  SYMBOL: string = "CORG"
  TOTAL_SUPPLY: u64 = 420;
  DNA_DIGITS: u32 = 16;
  HEX_ALPHABET = '0123456789abcdef';

  //Methods to call for Terms 
  name(): string {
    return NAME;
  }

  symbol(): string {
    return SYMBOL;
  }

  // Initialization
  init(initialOwner: string): void {
    near.log("initialOwner: " + initialOwner);
    assert(storage.getItem("init") == null, "Already initialized token supply");
    storage.setU64("io::" + initialOwner, TOTAL_SUPPLY);
    storage.setItem("init", "done");
  }

  // Collections where we store data
  balances = collections.map<string, u64>("b");
  corgis = collections.map<string, Corgi>("c");
  corgisByOwner = collections.map<string, CorgiArray>("co");

  // Total Supply for user
  totalSupply(): string {
    return TOTAL_SUPPLY.toString();
  }

  //Balance for owner
  // Owner ID
  ownerOf(tokenId: string): string {
    let corgi = getCorgi(tokenId);
    let owner = corgi.owner;
    return owner;
  }
  // Balance for owner
  balanceOf(owner: string): u64 {
    return balances.get(owner);
  }

  setBalance(owner: string, balance: u64): void {
    balances.set(owner, balance);
  }

  updateBalance(owner: string, increment: u64): void {
    let balance = balanceOf(owner);
    if (balance) {
      near.log(`${balance}`);
    } else {
      near.log("issues");
    }
  }

  //Actions for Corgi

  transfer(to: string, tokenId: string): void {
    let corgi = getCorgi(tokenId);
    assert(corgi.owner !== context.sender, "corgi does not belong to " + context.sender);
    incrementNewOwnerCorgis(to, tokenId);
    decrementOldOwnerCorgis(corgi.owner, tokenId);
  }
  
  incrementNewOwnerCorgis(to: string, tokenId: string): void {
    let corgi = getCorgi(tokenId);
    corgi.owner = to;
    near.log(to);
    setCorgisByOwner(corgi);
    setCorgi(corgi);
  }

  decrementOldOwnerCorgis(from: string, tokenId: string): void {
    let _corgis = corgisByOwner.get(from).corgis;
    for (let i = 0; i < _corgis.length; i++) {
      if (tokenId == _corgis[i].dna) {
        _corgis.splice(i, 1);
        near.log("match");
      }
    }
    let oca = new CorgiArray()
    oca.corgis = _corgis;
    corgisByOwner.set(from, oca);
  }

  //Create Corgi

  _createCorgi(name: string, dna: string, color: string): Corgi {
    let corgi = new Corgi();
    corgi.owner = context.sender;
    corgi.dna = dna;
    corgi.name = name;
    corgi.color = color
    setCorgi(corgi);
    setCorgisByOwner(corgi);
    return corgi;
  }

  createRandomCorgi(name: string, seed: i32): Corgi {
    let randDna = generateRandomDna();
    let color = generateRandomColorHex(seed);
    return _createCorgi(name, randDna, color);
  }

  // Generate unique Corgi
  generateRandomDna(): string {
    let buf = near.randomBuffer(DNA_DIGITS);
    let b64 = base64.encode(buf);
    near.log(b64);
    return b64;
  }

  generateRandomColorHex(int: i32): string {
    Math.seedRandom(int);
    let rand = Math.floor(Math.random() * 16777215) as u32;
    let hex = intToHex(rand);
    return "#" + hex;
  }
  
  getCorgi(tokenId: string): Corgi {
    return corgis.get(tokenId);
  }
  
  setCorgi(corgi: Corgi): void {
    corgis.set(corgi.dna, corgi);
  }
  
  getSender(): string {
    return context.sender;
  }
  
  getCorgisByOwner(owner: string): CorgiArray {
    return corgisByOwner.get(owner);
  }

  setCorgisByOwner(corgi: Corgi): void {
    let _corgis = getCorgisByOwner(corgi.owner).corgis;
  
    if (_corgis == null) {
      _corgis = new Array();
      _corgis.push(corgi);
    } else {
      _corgis.push(corgi);
    }
  
    let ca = new CorgiArray();
  
    ca.corgis = _corgis;
    corgisByOwner.set(corgi.owner, ca);
  }

  
  
  //ERROR handling
  _corgiDNEError(corgi: Corgi): bool {
    return assert(corgi == null, "This corgi does not exist");
  }

}



const NAME: string = "The NEAR Corgi Token";
const SYMBOL: string = "CORG"
const TOTAL_SUPPLY: u64 = 420;
const DNA_DIGITS: u32 = 16;
const HEX_ALPHABET = '0123456789abcdef';

export function init(initialOwner: string): void {
  near.log("initialOwner: " + initialOwner);
  assert(storage.getItem("init") == null, "Already initialized token supply");
  storage.setU64("io::" + initialOwner, TOTAL_SUPPLY);
  storage.setItem("init", "done");
}

// Collections where we store data
let balances = collections.map<string, u64>("b");
let corgis = collections.map<string, Corgi>("c");
let corgisByOwner = collections.map<string, CorgiArray>("co");

// export function login():void {
// }

export function balanceOf(owner: string): u64 {
  return balances.get(owner);
}

export function ownerOf(tokenId: string): string {
  let corgi = getCorgi(tokenId);
  let owner = corgi.owner;
  return owner;
}

export function totalSupply(): string {
  return TOTAL_SUPPLY.toString();
}

export function name(): string {
  return NAME;
}

export function symbol(): string {
  return SYMBOL;
}

export function transfer(to: string, tokenId: string): void {
  let corgi = getCorgi(tokenId);
  assert(corgi.owner !== context.sender, "corgi does not belong to " + context.sender);
  incrementNewOwnerCorgis(to, tokenId);
  decrementOldOwnerCorgis(corgi.owner, tokenId);
}

function incrementNewOwnerCorgis(to: string, tokenId: string): void {
  let corgi = getCorgi(tokenId);
  corgi.owner = to;
  near.log(to);
  setCorgisByOwner(corgi);
  setCorgi(corgi);
}

function decrementOldOwnerCorgis(from: string, tokenId: string): void {
  let _corgis = corgisByOwner.get(from).corgis;
  for (let i = 0; i < _corgis.length; i++) {
    if (tokenId == _corgis[i].dna) {
      _corgis.splice(i, 1);
      near.log("match");
    }
  }
  let oca = new CorgiArray()
  oca.corgis = _corgis;
  corgisByOwner.set(from, oca);
}

function updateBalance(owner: string, increment: u64): void {
  let balance = balanceOf(owner);
  if (balance) {
    near.log(`${balance}`);
  } else {
    near.log("issues");
  }
}

function _createCorgi(name: string, dna: string, color: string): Corgi {
  let corgi = new Corgi();
  corgi.owner = context.sender;
  corgi.dna = dna;
  corgi.name = name;
  corgi.color = color
  setCorgi(corgi);
  setCorgisByOwner(corgi);
  return corgi;
}

export function generateRandomDna(): string {
  let buf = near.randomBuffer(DNA_DIGITS);
  let b64 = base64.encode(buf);
  near.log(b64);
  return b64;
}
function intToHex(integer: u32): string {
  let res = new Array<string>();
  do {
    let t = integer / 16;
    let r = integer % 16;
    integer = t;
    res.push(HEX_ALPHABET[r]);
  } while (integer);
  let hex = res.reverse().join('');
  return hex.length % 2 ? "0" + hex : hex;
}

export function generateRandomColorHex(int: i32): string {
  Math.seedRandom(int);
  let rand = Math.floor(Math.random() * 16777215) as u32;
  let hex = intToHex(rand);
  return "#" + hex;
}

export function createRandomCorgi(name: string, seed: i32): Corgi {
  let randDna = generateRandomDna();
  let color = generateRandomColorHex(seed);
  return _createCorgi(name, randDna, color);
}

export function getCorgi(tokenId: string): Corgi {
  return corgis.get(tokenId);
}

export function setCorgi(corgi: Corgi): void {
  corgis.set(corgi.dna, corgi);
}

export function getSender(): string {
  return context.sender;
}

export function getCorgisByOwner(owner: string): CorgiArray {
  return corgisByOwner.get(owner);
}

function setCorgisByOwner(corgi: Corgi): void {
  let _corgis = getCorgisByOwner(corgi.owner).corgis;

  if (_corgis == null) {
    _corgis = new Array();
    _corgis.push(corgi);
  } else {
    _corgis.push(corgi);
  }

  let ca = new CorgiArray();

  ca.corgis = _corgis;
  corgisByOwner.set(corgi.owner, ca);
}

export function setBalance(owner: string, balance: u64): void {
  balances.set(owner, balance);
}

//ERROR handling
function _corgiDNEError(corgi: Corgi): bool {
  return assert(corgi == null, "This corgi does not exist");
}

// simplified version of the ERC721
// contract ERC721 {
//    ERC20 compatible functions
//    function name() constant returns (string name);
//    function symbol() constant returns (string symbol);

//    function totalSupply() constant returns (uint256 totalSupply);
//    function balanceOf(address _owner) constant returns (uint balance);

//    Functions that define ownership
//    function ownerOf(uint256 tokenId) constant returns (address owner);

//    function approve(address to, uint256 tokenId);
//    function takeOwnership(uint256 tokenId);

//   //  function transfer(address to, uint256 tokenId);
//    function tokenOfOwnerByIndex(address _owner, uint256 _index) constant returns (uint tokenId);

//    // Token metadata
//    function tokenMetadata(uint256 tokenId) constant returns (string infoUrl);

