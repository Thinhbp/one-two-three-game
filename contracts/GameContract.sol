// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract oan_tu_ti{


    uint constant Scissors = 0;
    uint constant Rock = 1;
    uint constant Paper = 2;
    
    uint constant Win_1 = 1;
    uint constant Draw = 0;
    uint constant Win_2 = 2;

    uint constant Empty = 0;
    uint constant One_person = 1;
    uint constant Full = 2;

    uint choose_2 = 3;
    uint check_2 = 0;


    uint choose_1 = 3;
    uint check_1 = 0;


    struct Room {
        address Address_1;
        address Address_2;
        uint Status ;
        bytes32 Guess_1;
        bytes32 Guess_2;
        uint Result;
        uint Bet_amount;
        uint check_1 ;
        uint check_2 ;
        }

        
     

    Room[100] public arrRoom; 

    function Room_status(uint number) public view returns (uint256) {
        return arrRoom[number].Status ;
    }

    function room_status() public view returns (uint[100] memory) {
        uint[100] memory arrroom_status;
        for(uint i; i < 100; i++) {
            arrroom_status[i] = arrRoom[i].Status; 
        }

        return arrroom_status;
    }




    function uint2str(uint256 _i) internal pure returns (string memory str){
        if (_i == 0){
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0){
           length++;
           j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0){
           bstr[--k] = bytes1(uint8(48 + j % 10));
           j /= 10;
        }
        str = string(bstr);
        return str;
    }

    // Hàm rút tiền . Một trong 2 người chơi đều có quyền rút tiền khi 1 trong 2 chưa gửi key bí mật lên hợp đồng.
    // Nếu chủ phòng là người rút thì tiền cược 2 người chơi sẽ về lại tài khoản của họ và phòng trở về trạng thái available
    // Nếu người chơi 2 rút tiền thì họ sẽ nhận lại tiền và phòng trở về trạng thái 1.
    function withdraw(uint _number)  public payable {
        require(arrRoom[_number].Status == Full || arrRoom[_number].Status == One_person, "You can not withdraw");
        require(msg.sender == arrRoom[_number].Address_1 || msg.sender == arrRoom[_number].Address_2,"You are not players in this room");
        require(arrRoom[_number].check_1 == 0,"You can not withdraw");
        require(arrRoom[_number].check_2 == 0,"You can not withdraw");
        if (msg.sender == arrRoom[_number].Address_1) {
            payable(msg.sender).transfer(arrRoom[_number].Bet_amount);
            payable(arrRoom[_number].Address_2).transfer(arrRoom[_number].Bet_amount);
            arrRoom[_number].Status = Empty;
        }

        if (msg.sender == arrRoom[_number].Address_2) {
            arrRoom[_number].Status = One_person;
            payable(msg.sender).transfer(arrRoom[_number].Bet_amount);
        }
    }
 
    

    
    function select_guess(uint _number, bytes32 hashcode) public payable  returns (string memory description)  {
       if (arrRoom[_number].Status == Empty) {
            arrRoom[_number].Address_1 = msg.sender ;
            arrRoom[_number].Bet_amount = msg.value;
            arrRoom[_number].Guess_1 = hashcode ;
            arrRoom[_number].Status = One_person;
       } else {
                require(arrRoom[_number].Address_1 != msg.sender,"You already selected");
                require(msg.value == arrRoom[_number].Bet_amount,"You must bet equal in the first 1  ");
                require(arrRoom[_number].Status == One_person);
                arrRoom[_number].Status = Full;
                arrRoom[_number].Guess_2 = hashcode ;
                arrRoom[_number].Address_2 = msg.sender ;
         }
    }

    function input_secret(string memory sercet_code, uint _number) public payable returns (string memory description) {
        require(arrRoom[_number].Status == Full,"please wait");
        if (msg.sender == arrRoom[_number].Address_1) {
            bytes memory c;
            for (uint i; i < 3; i++){
                c = bytes.concat(bytes(sercet_code),bytes(uint2str(i)));
                if (sha256(c) == arrRoom[_number].Guess_1) {
                    choose_1 = i;
                    check_1 = 1;
                    break;
                }
            }
            require(choose_1 != 3,"the first sercet_code is wrong");
            arrRoom[_number].check_1 = check_1;    
        }
        if (msg.sender == arrRoom[_number].Address_2) {
            bytes memory c;
            for (uint i; i < 3; i++){
                c = bytes.concat(bytes(sercet_code),bytes(uint2str(i)));
                if (sha256(c) == arrRoom[_number].Guess_2) {
                    choose_2 = i;
                    check_2 = 1;
                    break;
                }
            }
            require(choose_2 != 3,"the second sercet_code is wrong");
            arrRoom[_number].check_2 = check_2;    
        } 

        if (arrRoom[_number].check_1 !=0 && arrRoom[_number].check_2 !=0) {
            make_result(choose_1,choose_2,_number);
                if (arrRoom[_number].Result == Draw){
                    payable (arrRoom[_number].Address_1).transfer(arrRoom[_number].Bet_amount);
                    payable (arrRoom[_number].Address_2).transfer(arrRoom[_number].Bet_amount);
                    description  = " Draw";
                }

                if (arrRoom[_number].Result == Win_1){
                    description = "The first is win";
                    payable (arrRoom[_number].Address_1).transfer(arrRoom[_number].Bet_amount*2);
                   
                }
                
                if (arrRoom[_number].Result == Win_2){
                    description = " The secound is win";
                    payable (arrRoom[_number].Address_2).transfer(arrRoom[_number].Bet_amount*2);
                }
                arrRoom[_number].Status = Empty;

        }             
        return description;
    }

    function make_result(
        uint256 choose_1,
        uint256 choose_2,
        uint256 _number
    ) private {
        if (choose_1 == Scissors && choose_2 == Rock) {
            arrRoom[_number].Result = Win_2;
        }

        if (choose_1 == Scissors && choose_2 == Paper) {
            arrRoom[_number].Result = Win_1;
        }

        if (choose_1 == Scissors && choose_2 == Scissors) {
            arrRoom[_number].Result = Draw;
        }

        if (choose_1 == Rock && choose_2 == Scissors) {
            arrRoom[_number].Result = Win_1;
        }

        if (choose_1 == Rock && choose_2 ==Paper) {
            arrRoom[_number].Result = Win_2;
        }

        if (choose_1 == Rock && choose_2 == Rock) {
            arrRoom[_number].Result = Draw;
        }

        if (choose_1 == Paper && choose_2 == Scissors) {
            arrRoom[_number].Result = Win_2;
        }

        if (choose_1 == Paper && choose_2 == Paper) {
            arrRoom[_number].Result = Draw;
        }

        if (choose_1 == Paper && choose_2 == Rock) {
            arrRoom[_number].Result = Win_1;
        }
    }
}
