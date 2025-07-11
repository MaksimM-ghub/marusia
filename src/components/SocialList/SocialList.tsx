import "./SocialList.scss";

export const SocialList = () => {
  return (
    <ul className="list-reset social__list">
      <li className="social__item">
        <a className="social__link" href="http://vk.com" target="_blank">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className=""
              x="0.5"
              y="0.5"
              width="35"
              height="35"
              rx="7.5"
              strokeOpacity="0.8"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M26.4875 14.3797C26.6262 13.9851 26.4875 13.6981 25.8729 13.6981H23.8308C23.3153 13.6981 23.0774 13.9492 22.9387 14.2183C22.9387 14.2183 21.8879 16.5141 20.4207 18.0027C19.9449 18.4332 19.7268 18.5767 19.4691 18.5767C19.3303 18.5767 19.1519 18.4332 19.1519 18.0386V14.3617C19.1519 13.8954 18.9933 13.6802 18.5571 13.6802H15.3453C15.0281 13.6802 14.8299 13.8954 14.8299 14.1106C14.8299 14.5591 15.5634 14.6667 15.6427 15.9222V18.6484C15.6427 19.2403 15.5238 19.3479 15.266 19.3479C14.5721 19.3479 12.8869 17.0342 11.8758 14.3976C11.6775 13.8775 11.4793 13.6802 10.9638 13.6802H8.90191C8.30714 13.6802 8.20801 13.9313 8.20801 14.2003C8.20801 14.6846 8.90191 17.1239 11.4396 20.3524C13.1249 22.5585 15.5238 23.7422 17.6848 23.7422C18.9933 23.7422 19.1519 23.4732 19.1519 23.0248V21.3568C19.1519 20.8187 19.2708 20.729 19.6872 20.729C19.9846 20.729 20.5199 20.8725 21.7292 21.9307C23.117 23.1862 23.355 23.7602 24.1282 23.7602H26.1703C26.765 23.7602 27.0426 23.4911 26.884 22.971C26.7056 22.4509 26.0315 21.6976 25.1591 20.8007C24.6833 20.2986 23.9696 19.7426 23.7515 19.4735C23.4541 19.1148 23.5334 18.9713 23.7515 18.6484C23.7317 18.6484 26.2297 15.4559 26.4875 14.3797Z"
              fillOpacity="0.8"
            />
          </svg>
        </a>
      </li>
      <li className="social__item">
        <a className="social__link" href="http://youtube.com" target="_blank">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="35"
              height="35"
              rx="7.5"
              strokeOpacity="0.8"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.001 1.04957C14.6619 1.23093 15.1824 1.7653 15.359 2.4439C15.68 3.67379 15.68 6.23997 15.68 6.23997C15.68 6.23997 15.68 8.80606 15.359 10.036C15.1824 10.7146 14.6619 11.249 14.001 11.4305C12.8032 11.76 8.00001 11.76 8.00001 11.76C8.00001 11.76 3.19678 11.76 1.99896 11.4305C1.33804 11.249 0.817549 10.7146 0.640909 10.036C0.320007 8.80606 0.320007 6.23997 0.320007 6.23997C0.320007 6.23997 0.320007 3.67379 0.640909 2.4439C0.817549 1.7653 1.33804 1.23093 1.99896 1.04957C3.19678 0.719971 8.00001 0.719971 8.00001 0.719971C8.00001 0.719971 12.8032 0.719971 14.001 1.04957ZM6.55998 4.0802V8.88021L10.4 6.4803L6.55998 4.0802Z"
              fillOpacity="0.8"
              transform="translate(11, 13)"
            />
          </svg>
        </a>
      </li>
      <li className="social__item">
        <a className="social__link" href="http://t.me" target="_blank">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="35"
              height="35"
              rx="7.5"
              strokeOpacity="0.8"
            />
            <path
              d="M8.60106 17.8588C10.2844 16.9316 12.1635 16.1577 13.9192 15.3799C16.9397 14.1058 19.9723 12.8539 23.0354 11.6883C23.6314 11.4897 24.7022 11.2955 24.8072 12.1787C24.7497 13.4288 24.5132 14.6717 24.3509 15.9145C23.9392 18.6476 23.4632 21.3714 22.9991 24.0955C22.8392 25.0029 21.7025 25.4726 20.9752 24.892C19.2273 23.7113 17.4659 22.5421 15.7403 21.3341C15.1751 20.7597 15.6992 19.9349 16.2041 19.5247C17.6437 18.106 19.1705 16.9006 20.5349 15.4085C20.9029 14.5197 19.8155 15.2687 19.4568 15.4982C17.4859 16.8564 15.5633 18.2975 13.4854 19.4911C12.424 20.0754 11.1869 19.5761 10.1259 19.25C9.1747 18.8562 7.78077 18.4594 8.60097 17.8589L8.60106 17.8588Z"
              fillOpacity="0.8"
            />
          </svg>
        </a>
      </li>
    </ul>
  );
};
