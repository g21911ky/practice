'use strict';

const storage = localStorage;

const table1 = document.querySelector('.to'); //表
const table2 = document.querySelector('.doing'); //表
const table3 = document.querySelector('.done'); //表
const todo = document.getElementById('todo'); //todo
const deadline = document.querySelector('input[type="date"]'); //〆切
const submit = document.getElementById('submit'); //登録ボタン

let list = [];
let list2=[];

document.addEventListener('DOMContentLoaded', () => {
  const json = storage.todoList;
  if (json == undefined) {
      return;
  }
  list = JSON.parse(json);
  for (const item of list) {
      addItem1(item);
  }
});

const addItem1 = (item) => {
  const tr = document.createElement('tr'); //tr要素を作成(行)
    //繰り返しはfor-in文
    for (const prop in item) {
        const td = document.createElement('td'); //td要素を生成(要素)
        if (prop == 'done') { //完了欄の場合
            //完了チェックボックスを追加
            const checkbox = document.createElement('input'); //要素生成
            checkbox.type = 'checkbox'; //tyoe属をcheckboxに
            checkbox.checked = item[prop]; //check属性を設定
            td.appendChild(checkbox); //td要素の子要素に
            checkbox.addEventListener('change', checkBoxListener);
        } else {
            td.textContent = item[prop]; //ブラケット記法(その他の欄)
        }
        tr.appendChild(td); //生成したtd要素をtr要素に追加
    }
    table1.append(tr); //trエレメントをtable要素に追加
};

const addItem3 = (item) => {
  const tr = document.createElement('tr'); //tr要素を作成(行)
    //繰り返しはfor-in文
    for (const prop in item) {
        const td = document.createElement('td'); //td要素を生成(要素)
        if (prop == 'done') { //完了欄の場合
            //完了チェックボックスを追加
            const checkbox = document.createElement('input'); //要素生成
            checkbox.type = 'checkbox'; //tyoe属をcheckboxに
            checkbox.checked = item[prop]; //check属性を設定
            td.appendChild(checkbox); //td要素の子要素に
            checkbox.addEventListener('change', checkBoxListener);
        } else {
            td.textContent = item[prop]; //ブラケット記法(その他の欄)
        }
        tr.appendChild(td); //生成したtd要素をtr要素に追加
    }
    table3.append(tr); //trエレメントをtable要素に追加
};


const checkBoxListener = (ev) => {
  const trList = Array.from(document.getElementsByTagName('tr')); //テーブルの全tr要素のリストを取得
  const currentTr = ev.currentTarget.parentElement.parentElement; //チェックボックスの親(td)の親(tr)を取得
  const idx = trList.indexOf(currentTr) - 1; //配列.indexOfメソッドで何番目(インデックス)かを取得
  list[idx].done = ev.currentTarget.checked; //配列listにそのインデックスでアクセスしてdoneを更新
  storage.todoList = JSON.stringify(list); //ストレージデータを更新
};

//todo登録ボタン
submit.addEventListener('click', () => {
  const item = {}; //入力値を一時的に格納するオブジェクト

  if (todo.value != '') {
    item.todo = todo.value;
  } else {
    item.todo = ' ';
  }
  if (deadline.value != '') {
    item.deadline = deadline.value;
  } else {
    const date = new Date(); //本日の日付情報を取得
    item.deadline = date.toLocaleDateString().replace(/\//g, '-'); //日本の体裁を変更
  }
  item.done = false;  //完了はひとまずboolean値で設定

  todo.value = '';
  deadline.value = '';

  addItem1(item);

  list.push(item);
  storage.todoList = JSON.stringify(list);
});


const filterButton = document.createElement('button'); //ボタン要素を生成(この文を消すと全ボタン消える)

const main = document.querySelector('main');
main.appendChild(filterButton);

filterButton.addEventListener('click', () => {
  clearTable();
});

const clearTable = () => {
  const trList = Array.from(document.getElementsByTagName('tr'));
  trList.shift();
  for (const tr of trList) {
    tr.remove();
  }
};

const remove = document.createElement('button');
remove.textContent = '整理する';
remove.id = 'remove'; //css装飾用
const br = document.createElement('br'); //改行したい
main.appendChild(br);
main.appendChild(remove);

remove.addEventListener('click', () => {
  table1.clearTable(); //toを一旦削除
  list = list.filter((item) => item.done == false); //未完了のtoを抽出して定数listを置き換え
  //list2 = list2.filter((item) => item.done == true); //完了のtoを抽出して定数list2を置き換え
  for (const item of list) { //toデータをテーブルに追加
    table1.addItem1(item);
  }
  /*
  for (const item of list2) { //toデータをテーブルに追加
    table3.addItem3(item);
  }
  */
  storage.todoList = JSON.stringify(list); //ストレージデータを更新
});

