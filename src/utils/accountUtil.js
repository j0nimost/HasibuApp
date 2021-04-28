const AccountModel = require('../models/accountsModel');

class AccountUtil{

    // load all the default values
    async loadAccountCountAsync(accType) {
        try
        {
            switch(accType)
            {
                // Credit
                case "HAC":
                    return (await AccountModel.find({accountRef: /HAC/})).length;
                // Payment
                case "HAP":
                    return (await AccountModel.find({accountRef: /HAP/})).length;
                // Debit
                case "HAD":
                    return (await AccountModel.find({accountRef: /HAD/})).length;
                // Refund
                case "HAR":
                    return (await AccountModel.find({accountRef: /HAF/})).length;
            }
        }
        catch(error){
            throw error;
        }
        
    }

    // add new Account
    async addAccountAsync(accountItem) {
        try 
        {
            const acc =  await AccountModel.create(accountItem);
        }
        catch(error)
        {
            throw error;
        }
    }

    // fetch if transcationRef is used
    async IsAccountTransactionRef(_transactionRef) {
        try
        {
            const account = await AccountModel.find({transactionRef: _transactionRef});
            if(account.length > 0)
            {
                return true;
            }
            return false;
        }
        catch(error)
        {
            throw error;
        }
    }

    accountRefFormatter(accountCount) {
        let _accountCount = ''; 
        if(Number.isInteger(accountCount))
        {
            if(accountCount > 0)
            {
                _accountCount = accountCount.toString();
            }
            else {
                _accountCount = '1'; 
            }
            
        }

        while(_accountCount.length < 9)
        {
            _accountCount = '0' + _accountCount;
        }

        return _accountCount;
    }
}

 module.exports = AccountUtil;

