import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { SvelteElement, SvelteComponent } from 'svast';

import { parseNode } from '../src/main';
import { void_els } from '../src/void_els';

const element = suite('parse-element');

element('parses a self closing tag without attributes', () => {
	const { parsed } = parseNode({ value: `<input />` });

	assert.equal(parsed, <SvelteElement>{
		type: 'svelteElement',
		tagName: 'input',
		selfClosing: true,
		children: [],
		properties: [],
	});
});

element('parses a self closing component without attributes', () => {
	const { parsed } = parseNode({ value: `<HelloFriend />` });

	assert.equal(parsed, <SvelteComponent>{
		type: 'svelteComponent',
		tagName: 'HelloFriend',
		selfClosing: true,
		children: [],
		properties: [],
	});
});

void_els.forEach((el) => {
	element(`parses all void tags without attributes: < ${el} >`, () => {
		const { parsed } = parseNode({ value: `<${el} >` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: el,
			selfClosing: true,
			children: [],
			properties: [],
		});
	});
});

element('parses a self closing tag with shorthand boolean attribute', () => {
	const { parsed } = parseNode({ value: `<input hello />` });

	assert.equal(parsed, <SvelteElement>{
		type: 'svelteElement',
		tagName: 'input',
		selfClosing: true,
		children: [],
		properties: [
			{
				type: 'svelteProperty',
				name: 'hello',
				value: [],
				shorthand: 'boolean',
				modifiers: [],
			},
		],
	});
});

element(
	'parses a self closing tag with shorthand boolean attribute: no trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello/>` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [],
					shorthand: 'boolean',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a void tag with shorthand boolean attribute: no trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello>` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [],
					shorthand: 'boolean',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a self-closing tag with multiple shorthand boolean attributes: trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello goodbye />` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [],
					shorthand: 'boolean',
					modifiers: [],
				},
				{
					type: 'svelteProperty',
					name: 'goodbye',
					value: [],
					shorthand: 'boolean',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a self-closing tag with multiple shorthand boolean attributes: no trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello goodbye/>` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [],
					shorthand: 'boolean',
					modifiers: [],
				},
				{
					type: 'svelteProperty',
					name: 'goodbye',
					value: [],
					shorthand: 'boolean',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a void tag with multiple shorthand boolean attributes: no trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello goodbye>` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [],
					shorthand: 'boolean',
					modifiers: [],
				},
				{
					type: 'svelteProperty',
					name: 'goodbye',
					value: [],
					shorthand: 'boolean',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a void tag with multiple shorthand boolean attributes: trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello goodbye >` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [],
					shorthand: 'boolean',
					modifiers: [],
				},
				{
					type: 'svelteProperty',
					name: 'goodbye',
					value: [],
					shorthand: 'boolean',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a self-closing tag with an unquoted attribute: trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello=value />` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a self-closing tag with an unquoted attribute: no trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello=value/>` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element('parses a void tag with an unquoted attribute: trailing space', () => {
	const { parsed } = parseNode({ value: `<input hello=value >` });

	assert.equal(parsed, <SvelteElement>{
		type: 'svelteElement',
		tagName: 'input',
		selfClosing: true,
		children: [],
		properties: [
			{
				type: 'svelteProperty',
				name: 'hello',
				value: [
					{
						type: 'text',
						value: 'value',
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

element(
	'parses a self-closing tag with an unquoted attribute: no trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello=value>` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a self-closing tag with a double-quoted attribute: trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello="value" />` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a self-closing tag with a double-quoted attribute: no trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello="value"/>` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a void tag with a double-quoted attribute: trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello="value" >` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a void tag with a double-quoted attribute: no trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello="value">` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a self-closing tag with double-quoted attributes: many values, trailing whitespace',
	() => {
		const { parsed } = parseNode({ value: `<input hello="value valuetwo" />` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a self-closing tag with double-quoted attributes: many values, no trailing whitespace',
	() => {
		const { parsed } = parseNode({ value: `<input hello="value valuetwo"/>` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a void tag with double-quoted attributes: many values, trailing whitespace',
	() => {
		const { parsed } = parseNode({ value: `<input hello="value valuetwo" >` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a void tag with double-quoted attributes: many values, no trailing whitespace',
	() => {
		const { parsed } = parseNode({ value: `<input hello="value valuetwo">` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a self-closing tag with a single-quoted attribute: trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello='value' />` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a self-closing tag with a single-quoted attribute: no trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello='value'/>` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a void tag with a single-quoted attribute: trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello='value' >` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a void tag with a single-quoted attribute: no trailing space',
	() => {
		const { parsed } = parseNode({ value: `<input hello='value'>` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a self-closing tag with single-quoted attributes: many values, trailing whitespace',
	() => {
		const { parsed } = parseNode({ value: `<input hello='value valuetwo' />` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a self-closing tag with single-quoted attributes: many values, no trailing whitespace',
	() => {
		const { parsed } = parseNode({ value: `<input hello='value valuetwo'/>` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a void tag with single-quoted attributes: many values, trailing whitespace',
	() => {
		const { parsed } = parseNode({ value: `<input hello='value valuetwo' >` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a void tag with single-quoted attributes: many values, no trailing whitespace',
	() => {
		const { parsed } = parseNode({ value: `<input hello='value valuetwo'>` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteProperty',
					name: 'hello',
					value: [
						{
							type: 'text',
							value: 'value',
						},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element('parses a void tag with a directive', () => {
	const { parsed } = parseNode({ value: `<input hello:world >` });

	assert.equal(parsed, <SvelteElement>{
		type: 'svelteElement',
		tagName: 'input',
		selfClosing: true,
		children: [],
		properties: [
			{
				type: 'svelteDirective',
				name: 'hello',
				specifier: 'world',
				value: [],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

element('parses a self-closing tag with a directive', () => {
	const { parsed } = parseNode({ value: `<input hello:world />` });

	assert.equal(parsed, <SvelteElement>{
		type: 'svelteElement',
		tagName: 'input',
		selfClosing: true,
		children: [],
		properties: [
			{
				type: 'svelteDirective',
				name: 'hello',
				specifier: 'world',
				value: [],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

element('parses a self-closing tag with two directives', () => {
	const { parsed } = parseNode({
		value: `<input hello:world goodbye:friends />`,
	});

	assert.equal(parsed, <SvelteElement>{
		type: 'svelteElement',
		tagName: 'input',
		selfClosing: true,
		children: [],
		properties: [
			{
				type: 'svelteDirective',
				name: 'hello',
				specifier: 'world',
				value: [],
				shorthand: 'none',
				modifiers: [],
			},
			{
				type: 'svelteDirective',
				name: 'goodbye',
				specifier: 'friends',
				value: [],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

element(
	'parses a tag with a directive an a directive value: double-quoted',
	() => {
		const { parsed } = parseNode({ value: `<input hello:world="cheese" />` });

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteDirective',
					name: 'hello',
					specifier: 'world',
					value: [{ type: 'text', value: 'cheese' }],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a tag with a directive an a directive value: souble-quoted, two values',
	() => {
		const { parsed } = parseNode({
			value: `<input hello:world="cheese strings" />`,
		});

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteDirective',
					name: 'hello',
					specifier: 'world',
					value: [
						{ type: 'text', value: 'cheese' },
						{ type: 'text', value: 'strings' },
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element(
	'parses a tag with a directive an a directive value: single-quoted, two values',
	() => {
		const { parsed } = parseNode({
			value: `<input hello:world='cheese strings' />`,
		});

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteDirective',
					name: 'hello',
					specifier: 'world',
					value: [
						{ type: 'text', value: 'cheese' },
						{ type: 'text', value: 'strings' },
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	}
);

element('parses a tag with a directive an a directive value: unquoted', () => {
	const { parsed } = parseNode({ value: `<input hello:world="cheese" />` });

	assert.equal(parsed, <SvelteElement>{
		type: 'svelteElement',
		tagName: 'input',
		selfClosing: true,
		children: [],
		properties: [
			{
				type: 'svelteDirective',
				name: 'hello',
				specifier: 'world',
				value: [{ type: 'text', value: 'cheese' }],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

element('parses a tag with an attribute with modifiers', () => {
	const { parsed } = parseNode({ value: `<input hello:world|modifierval />` });

	assert.equal(parsed, <SvelteElement>{
		type: 'svelteElement',
		tagName: 'input',
		selfClosing: true,
		children: [],
		properties: [
			{
				type: 'svelteDirective',
				name: 'hello',
				specifier: 'world',
				value: [],
				shorthand: 'none',
				modifiers: [{ type: 'modifier', value: 'modifierval' }],
			},
		],
	});
});

element('parses a tag with an attribute with multiple modifiers', () => {
	const { parsed } = parseNode({
		value: `<input hello:world|modifierval|modifierval2 />`,
	});

	assert.equal(parsed, <SvelteElement>{
		type: 'svelteElement',
		tagName: 'input',
		selfClosing: true,
		children: [],
		properties: [
			{
				type: 'svelteDirective',
				name: 'hello',
				specifier: 'world',
				value: [],
				shorthand: 'none',
				modifiers: [
					{ type: 'modifier', value: 'modifierval' },
					{ type: 'modifier', value: 'modifierval2' },
				],
			},
		],
	});
});

element(
	'parses a tag with an attribute with multiple modifiers and a value',
	() => {
		const { parsed } = parseNode({
			value: `<input hello:world|modifierval|modifierval2=someval />`,
		});

		assert.equal(parsed, <SvelteElement>{
			type: 'svelteElement',
			tagName: 'input',
			selfClosing: true,
			children: [],
			properties: [
				{
					type: 'svelteDirective',
					name: 'hello',
					specifier: 'world',
					value: [{ type: 'text', value: 'someval' }],
					shorthand: 'none',
					modifiers: [
						{ type: 'modifier', value: 'modifierval' },
						{ type: 'modifier', value: 'modifierval2' },
					],
				},
			],
		});
	}
);

element.run();
