import React from "react";

const Card = ({ name, id, image }) => {
  return (
    <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <a href={`/detailsme/${id}`}>
        <article class="overflow-hidden rounded-lg shadow-lg bg-[#FFA07A]">
          <img alt="Placeholder" class="block h-[300px] w-full" src={image} />

          <header class="flex items-center justify-between leading-tight p-2 md:p-4">
            <h1 class="text-lg">
              <p class="no-underline hover:underline text-black font-poppins">
                {name}
              </p>
            </h1>
            {/* <p class="text-grey-darker text-sm">11/1/19</p> */}
          </header>

          {/* <footer class="flex items-center justify-between leading-none p-2 md:p-4">
            <a
              class="flex items-center no-underline hover:underline text-black"
              href="#"
            >
              <img
                alt="Placeholder"
                class="block rounded-full"
                src="https://picsum.photos/32/32/?random"
              />
              <p class="ml-2 text-sm">Author Name</p>
            </a>
            <a
              class="no-underline text-grey-darker hover:text-red-dark"
              href="#"
            >
              <span class="hidden">Like</span>
              <i class="fa fa-heart"></i>
            </a>
          </footer> */}
        </article>
      </a>
    </div>
  );
};

export default Card;
