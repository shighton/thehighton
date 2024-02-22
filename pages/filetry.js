import React from "react";

const FileTry = () => {

    React.useEffect(() => {
        const Web3 = require("web3");
        const ethereum = window.ethereum;

        const App = {
            web3Provider: null,
            contracts: {},
            account: '0x0',

            init: async function() {
                return await App.initWeb3();
            },

            initWeb3: async function() {
                if (typeof web3 !== 'undefined') {
                // If a web3 instance is already provided by Meta Mask
                web3 = new Web3(window.ethereum);
                web3.eth.defaultAccount = web3.eth.accounts[0];
                } else {
                //
                }
                return App.initContract();
            },

            initContract: function() {
                $.getJSON("web3/Files.json", function(files) {
                // Instantiate a new truffle contract from the artifact
                App.contracts.Files = TruffleContract(files);
                App.contracts.Files.setProvider(ethereum);

                return App.render();
                });
            },

            render: function() {
                var filesInstance;
                var loader = $("#loader");
                var content = $("#content");

                loader.show();
                content.hide();

                account = web3.eth.accounts[0];

                App.account = account;
                $("#accountAddress").html("Your Account: " + account);

                // Load contract data
                App.contracts.Files.deployed().then(function(instance) {
                filesInstance = instance;
                return filesInstance.id();
                }).then(function(id) {
                var filesInfo = $("#filesInfo");
                filesInfo.empty();

                Promise.all(Array.from({ length: id }, (_, i) => filesInstance.files(i + 1))).then((files) => {
                    files.forEach((file) => {
                    var id = file[0];
                    var tempOwner = file[3];
                    var trueOwner = file[4];
                
                    // Render file Result
                    if (id > 0) {
                        var fileTemplate = "<tr><th>" + id + "</th><td>" + tempOwner + "</td><td>" + trueOwner + "</td></tr>";
                        filesInfo.append(fileTemplate);
                    }
                    });
                });

                enableButton.onclick = async () => {
                    if(typeof window.ethereum !== 'undefined') {
                    await window.ethereum.request({ method: 'eth_requestAccounts'});
                    }
                    else {
                    alert("Metamask is not available... Please install it to continue.")
                    }
                }

                async function viewFile() {
                    try {
                    var fileId = document.getElementById("view-fileId").value;
                    const contents = await filesInstance.viewFile.call(fileId);
                    return contents;
                    } catch (error) {
                    console.error("Error fetching file contents:", error);
                    throw error; // Rethrow the error to be caught in the calling function
                    }
                }
                
                document.getElementById("viewForm").addEventListener("submit", async function(event) {
                    event.preventDefault();
                    var fileId = document.getElementById("view-fileId").value;
                    try {
                    const fileContents = await viewFile();
                    alert("Contents for File " + fileId + ":\n" + fileContents);
                    console.log("File " + fileId + " was viewed");
                    } catch (error) {
                    console.error("Error alerting file contents:", error);
                    }
                }, false);

                async function addFile() {
                    try {
                    var fileName = document.getElementById("fileName").value;
                    var fileContents = document.getElementById("fileContents").value;
                    await filesInstance.addFile(fileName, fileContents);
                    id = parseInt(id) + 1;
                    var fileTemplate = "<tr><th>" + id + "</th><td>" + fileName + "</td><td>" + fileContents + "</td><td>" + account + "</td><td>" + account + "</td></tr>";
                    filesInfo.append(fileTemplate);
                    } catch (error) {
                    console.error("Error adding file:", error);
                    alert("Error adding file. Check the console for details.");
                    }
                }
                
                document.getElementById("addForm").addEventListener("submit", async function(event) {
                    event.preventDefault();
                    try {
                    await addFile();
                    console.log("File Added");
                    location.reload();
                    } catch (error) {
                    console.error("Error alerting file addition", error);
                    }
                }, false);

                async function borrowFile() {
                    try {
                    var fileId = document.getElementById("borrow-fileId").value;
                    var lendKey = document.getElementById("borrowKey").value;
                    await filesInstance.borrowFile(fileId, lendKey);
                    } catch (error) {
                    console.error("Error borrowing file:", error);
                    alert("Error borrowing file. Check the console for details.");
                    }
                }
                
                document.getElementById("borrowForm").addEventListener("submit", async function(event) {
                    event.preventDefault();
                    try {
                    await borrowFile();
                    console.log("File Borrowed");
                    location.reload();
                    } catch (error) {
                    console.error("Error alerting file borrowing", error);
                    }
                }, false);

                async function takeFile() {
                    try {
                    var fileId = document.getElementById("take-fileId").value;
                    var tradeKey = document.getElementById("takeKey").value;
                    await filesInstance.takeFile(fileId, tradeKey);
                    } catch (error) {
                    console.error("Error taking file:", error);
                    alert("Error taking file. Check the console for details.");
                    }
                }
                
                document.getElementById("takeForm").addEventListener("submit", async function(event) {
                    event.preventDefault();
                    try {
                    await takeFile();
                    console.log("File Taken");
                    location.reload();
                    } catch (error) {
                    console.error("Error alerting file taking", error);
                    }
                }, false);

                async function lendFile() {
                    try {
                    var fileId = document.getElementById("lend-fileId").value;
                    var lendKey = document.getElementById("lendKey").value;
                    var recipient = document.getElementById("lend-recipient").value;
                    console.log(fileId, lendKey, recipient);
                    await filesInstance.lendFile(fileId, lendKey, recipient);
                    } catch (error) {
                    console.error("Error lending file:", error);
                    alert("Error lending file. Check the console for details.");
                    }
                }
                
                document.getElementById("lendForm").addEventListener("submit", async function(event) {
                    event.preventDefault();
                    try {
                    await lendFile();
                    console.log("File Lent");
                    location.reload();
                    } catch (error) {
                    console.error("Error alerting file lending", error);
                    }
                }, false);

                async function giveFile() {
                    try {
                    var fileId = document.getElementById("give-fileId").value;
                    var giveKey = document.getElementById("giveKey").value;
                    var recipient = document.getElementById("give-recipient").value;
                    console.log(fileId, giveKey, recipient);
                    await filesInstance.giveFile(fileId, giveKey, recipient);
                    } catch (error) {
                    console.error("Error giving file:", error);
                    alert("Error giving file. Check the console for details.");
                    }
                }
                
                document.getElementById("giveForm").addEventListener("submit", async function(event) {
                    event.preventDefault();
                    try {
                    await giveFile();
                    console.log("File Given");
                    location.reload();
                    } catch (error) {
                    console.error("Error alerting file giving", error);
                    }
                }, false);

                async function deleteFile() {
                    try {
                    var fileId = document.getElementById("del-fileId").value;
                    var delKey = document.getElementById("delKey").value;
                    await filesInstance.deleteFile(fileId, delKey);
                    } catch (error) {
                    console.error("Error deleting file:", error);
                    alert("Error deleting file. Check the console for details.");
                    }
                }
                
                document.getElementById("delForm").addEventListener("submit", async function(event) {
                    event.preventDefault();
                    try {
                    await deleteFile();
                    console.log("File Deleted");
                    location.reload();
                    } catch (error) {
                    console.error("Error alerting file deletion", error);
                    }
                }, false);

                loader.hide();
                content.show();
                }).catch(function(error) {
                console.warn(error);
                });
            }
        };

        $(window).on('load', function() {
            App.init();
        });
    }, []);

    return (

        <div>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
            <div className="row">
                <div className="col-lg-12">

                    <h1 className="text-center">File Locker - Sabastian Highton</h1>
                    <hr/>
                    <br/>

                    <div id="loader">
                        <p className="text-center">Loading...</p>
                    </div>

                    <div id="content">
                        
                        <div className="top-content">
                        <p id="accountAddress" className="text-center"></p>
            
                        <div className="center-button">
                            <button id="enableButton" className="enableButton">Enable Metamask</button>
                        </div>
                        </div>

                        <br/><hr/>

                        <div className="functions">
                            <h2>View File</h2>
            
                            <form id="viewForm">
                                <label htmlFor="view-fileId">File ID:</label>
                                <input type="text" id="view-fileId" name="view-fileId" required/>
                                <input type="submit" value="Submit"/>
                            </form>
            
                            <h2>Add File</h2>
            
                            <form id="addForm">
                                <label htmlFor="fileName">Name:</label>
                                <input type="text" id="fileName" name="fileName" required/>
                                <label htmlFor="fileContents">Contents:</label>
                                <input type="text" id="fileContents" name="fileContents" required/>
                                <input type="submit" value="Submit"/>
                            </form>
                
                            <h2>Borrow File</h2>
                
                            <form id="borrowForm">
                                <label htmlFor="borrow-fileId">File ID:</label>
                                <input type="text" id="borrow-fileId" name="borrow-fileId" required/>
                                <label htmlFor="borrowKey">Borrow Key:</label>
                                <input type="text" id="borrowKey" name="borrowKey" required/>
                                <input type="submit" value="Submit"/>
                            </form>
                
                            <h2>Take File</h2>
                
                            <form id="takeForm">
                                <label htmlFor="take-fileId">File ID:</label>
                                <input type="text" id="take-fileId" name="take-fileId" required/>
                                <label htmlFor="takeKey">Take Key:</label>
                                <input type="text" id="takeKey" name="takeKey" required/>
                                <input type="submit" value="Submit"/>
                            </form>
                
                            <h2>Lend File</h2>
                
                            <form id="lendForm">
                                <label htmlFor="lend-fileId">File ID:</label>
                                <input type="text" id="lend-fileId" name="lend-fileId" required/>
                                <label htmlFor="lendKey">Lend Key:</label>
                                <input type="text" id="lendKey" name="lendKey" required/>
                                <label htmlFor="lend-recipient">Recipient:</label>
                                <input type="text" id="lend-recipient" name="lend-recipient" required/>
                                <input type="submit" value="Submit"/>
                            </form>
                
                            <h2>Give File</h2>
                
                            <form id="giveForm">
                                <label htmlFor="give-fileId">File ID:</label>
                                <input type="text" id="give-fileId" name="give-fileId" required/>
                                <label htmlFor="giveKey">Give Key:</label>
                                <input type="text" id="giveKey" name="giveKey" required/>
                                <label htmlFor="give-recipient">Recipient:</label>
                                <input type="text" id="give-recipient" name="give-recipient" required/>
                                <input type="submit" value="Submit"/>
                            </form>
                
                            <h2>Delete File</h2>
                
                            <form id="delForm">
                                <label htmlFor="del-fileId">File ID:</label>
                                <input type="text" id="del-fileId" name="del-fileId" required/>
                                <label htmlFor="delKey">Delete Key:</label>
                                <input type="text" id="delKey" name="delKey" required/>
                                <input type="submit" value="Submit"/>
                            </form>
                        </div>

                        <br/><hr/>
                        
                        <div className="file-info-header">
                            <h2>File Owners</h2>
                            </div>

                            <div className="file-info">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">File ID</th>
                                    <th scope="col">Temp Owner</th>
                                    <th scope="col">True Owner</th>
                                </tr>
                                </thead>
                                <tbody id="filesInfo">
                                </tbody>
                            </table>
                        </div>

                        <hr/>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileTry

