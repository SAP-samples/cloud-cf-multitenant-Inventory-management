// namespace sample;

entity PRODUCTS {
    key PRODUCT_ID           : String(50)     not null;
        PRODUCT_NAME         : String(100)    not null;
        PRODUCT_DESC         : String(300)    not null;
        PRODUCT_SUPPLIER     : String(100)    not null;
        PRODUCT_PRICE        : Decimal(10, 2) not null;
        PRODUCT_AVAILABILITY : Boolean        not null;
        QUANTITY             : Integer;
        TENANT_ID            : String(100)    not null;
};